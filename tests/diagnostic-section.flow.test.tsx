import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import { DiagnosticSection } from "../components/diagnostic-section"

// 1) Mocks pour éviter les warnings/erreurs Next & JSDOM
jest.mock("next/link", () => {
  const React = require("react")
  return ({ href, children, ...props }: any) =>
    React.createElement("a", { href, ...props }, children)
})

class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(window as any).IntersectionObserver = MockIntersectionObserver as any

// 2) Mock CameraCapture : déclenche onImageCapture dans un useEffect (=> plus de warning act)
jest.mock("../components/camera-capture", () => ({
  CameraCapture: ({ onImageCapture }: { onImageCapture: (url: string, file: File) => void }) => {
    React.useEffect(() => {
      // On peut passer un Blob (JSDOM ok) à la place d'un File.
      const blob = new Blob(["fake"], { type: "image/jpeg" })
      // TS attend un File, mais runtime FormData accepte un Blob => cast ok pour le test
      onImageCapture("/mock/url.jpg", blob as unknown as File)
    }, [onImageCapture])
    return <div data-testid="camera-capture-mock">camera mocked</div>
  },
}))

// 3) localStorage + token/user requis par le composant
beforeEach(() => {
  const store: Record<string, string> = {}
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => { store[k] = v },
      removeItem: (k: string) => { delete store[k] },
      clear: () => { Object.keys(store).forEach((k) => delete store[k]) },
      key: (i: number) => Object.keys(store)[i] ?? null,
      length: 0,
    },
    writable: true,
  })

  window.localStorage.setItem("repair_token", "fake.jwt.token")
  window.localStorage.setItem("repair_user", JSON.stringify({ id: "user123" }))
})

// 4) Mock fetch sans utiliser new Response (qui n'existe pas en JSDOM)
beforeEach(() => {
  global.fetch = jest.fn(async (input: RequestInfo, init?: RequestInit) => {
    const url = typeof input === "string" ? input : String(input)

    if (url.includes("/api/objects") && init?.method === "POST") {
      return {
        ok: true,
        status: 200,
        json: async () => ({ _id: "obj999" }),
      } as any
    }

    if (url.includes("/analyze/full") && init?.method === "POST") {
      return {
        ok: true,
        status: 200,
        json: async () => ({
          objet_detecte: "Smartphone",
          analyse: "Batterie défectueuse",
          solution: "Remplacer la batterie",
          videos: [],
        }),
      } as any
    }

    return { ok: false, status: 404, json: async () => ({}) } as any
  }) as any
})

afterEach(() => {
  jest.resetAllMocks()
})

   test("flow: capture → analyzing → results, puis CTA /ia-results et stockage local", async () => {
  render(<DiagnosticSection />)

  // On attend l’état "analyzing"
  await screen.findByText(/analyse votre image/i)

  // Puis l’état "results"
  await screen.findByText(/Diagnostic RepAIr terminé/i)

  // --- CHANGEMENT ICI : on cible par texte + on remonte à l'ancre
 // --- cibler l'ancre même si le texte existe aussi dans un <p>
const allMatches = await screen.findAllByText(/Voir les résultats détaillés/i)
// cherche l'élément <a> ou son parent <a>
const link =
  (allMatches.find(el => el.tagName.toLowerCase() === 'a') as HTMLAnchorElement) ||
  (allMatches.map(el => el.closest('a')).find(Boolean) as HTMLAnchorElement)

expect(link).toBeTruthy()
expect(link).toHaveAttribute('href', '/ia-results')


  // L'analyse est bien stockée
  const saved = window.localStorage.getItem("repair_last_analysis")
  expect(saved).toBeTruthy()
})



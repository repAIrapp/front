import { render, screen } from "@testing-library/react"
import { IAResultsPage } from "../components/ia-results/ia-results-page"

// Mock Next/Image pour les tests
jest.mock("next/image", () => (props: any) => <img alt={props.alt} src={props.src} />)

// Mock d'un localStorage simple
beforeEach(() => {
  const store: Record<string, string> = {}
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => {
        store[k] = v
      },
      removeItem: (k: string) => {
        delete store[k]
      },
      clear: () => {
        Object.keys(store).forEach((k) => delete store[k])
      },
      key: (i: number) => Object.keys(store)[i] ?? null,
      length: 0,
    },
    writable: true,
  })
})

test("affiche l’objet, l’analyse, la solution et les vidéos depuis localStorage", () => {
  const payload = {
    imageUrl: "/uploads/photo.jpg",
    objet_detecte: "Perceuse",
    analyse: "Analyse détaillée\nLigne 2",
    solution: "Solution proposée",
    videos: [
      { thumbnail: "/thumb1.jpg", title: "Tutoriel 1", url: "https://example.com/1" },
      { thumbnail: "/thumb2.jpg", title: "Tutoriel 2", url: "https://example.com/2" },
    ],
  }
  window.localStorage.setItem("repair_last_analysis", JSON.stringify(payload))

  render(<IAResultsPage />)

  // objet détecté
  expect(screen.getByText("Perceuse")).toBeInTheDocument()

  // analyse & solution (rendus dans <pre> dans ton code)
  expect(screen.getByText(/Analyse détaillée/)).toBeInTheDocument()
  expect(screen.getByText(/Solution proposée/)).toBeInTheDocument()

  // image
  const img = screen.getByAltText("Objet analysé par RepAIr") as HTMLImageElement
  expect(img.src).toContain("/uploads/photo.jpg")

  // vidéos
  expect(screen.getByText("Tutoriel 1")).toBeInTheDocument()
  expect(screen.getByText("Tutoriel 2")).toBeInTheDocument()
})

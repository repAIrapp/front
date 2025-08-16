import React from "react"
import { render, screen, waitFor } from "@testing-library/react"

// on importe directement le composant “content” (celui qui fait les effets)
import AuthCallbackContent from "../app/auth/callback/AuthCallbackContent"

// mock next/navigation (router + searchParams)
const pushMock = jest.fn()
const getMock = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => ({ get: getMock }),
}))

// utilitaire pour créer un JWT fake
function makeFakeJWT(payload: object) {
  const base64 = (obj: object) => Buffer.from(JSON.stringify(obj)).toString("base64url")
  return `${base64({ alg: "none", typ: "JWT" })}.${base64(payload)}.`
}

beforeEach(() => {
  pushMock.mockClear()
  getMock.mockReset()

  // localStorage mock simple
  const store: Record<string, string> = {}
  Object.defineProperty(window, "localStorage", {
    value: {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => { store[k] = v },
      removeItem: (k: string) => { delete store[k] },
      clear: () => { Object.keys(store).forEach(k => delete store[k]) },
      key: (i: number) => Object.keys(store)[i] ?? null,
      length: 0,
    },
    writable: true,
  })

  // stub cookies avec un petit store qui gère getter/setter correctement
let cookieStore: Record<string, string> = {}
Object.defineProperty(document, "cookie", {
  configurable: true,
  get() {
    return Object.entries(cookieStore)
      .map(([k, v]) => `${k}=${v}`)
      .join("; ")
  },
  set(value: string) {
    // value ressemble à "name=value; path=/; secure; samesite=strict"
    const [pair] = value.split(";")
    const eqIndex = pair.indexOf("=")
    if (eqIndex > -1) {
      const name = pair.substring(0, eqIndex).trim()
      const val = pair.substring(eqIndex + 1).trim()
      cookieStore[name] = val
    }
  },
})

})

test("avec token: stocke user/token et redirige vers /", async () => {
  const token = makeFakeJWT({
    id: "u1",
    email: "a@b.com",
    first_name: "Ann",
    last_name: "Bee",
  })
  getMock.mockReturnValue(token)

  render(<AuthCallbackContent />)

  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith("/")
  })

  expect(window.localStorage.getItem("repair_token")).toBe(token)
  const user = JSON.parse(window.localStorage.getItem("repair_user") as string)
  expect(user).toMatchObject({ id: "u1", email: "a@b.com", firstName: "Ann", lastName: "Bee" })

  expect(document.cookie).toMatch(/repair_token=/)
  expect(document.cookie).toMatch(/repair_user=/)
})

test("sans token: redirige vers /auth/signin", async () => {
  getMock.mockReturnValue(null)

  render(<AuthCallbackContent />)

  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith("/auth/signin")
  })
})

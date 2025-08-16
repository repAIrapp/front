import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import EmailVerificationContent from "../app/verify/Emailverificationcontent"

// mock router + searchParams
const pushMock = jest.fn()
const getMock = jest.fn()

jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  useSearchParams: () => ({ get: getMock }),
}))

beforeEach(() => {
  jest.useFakeTimers()
  pushMock.mockClear()
  getMock.mockReset()
   jest.resetAllMocks()

  // mock global fetch
  global.fetch = jest.fn() as any
})

afterEach(() => {
  jest.useRealTimers() // <--- remet les vrais timers après
})

test("succès: affiche succès puis redirige /auth/signin", async () => {
  getMock.mockReturnValue("u123")

  global.fetch = jest.fn(async () => ({
    ok: true,
    status: 200,
    json: async () => ({ success: true }),
  })) as any

  render(<EmailVerificationContent />)

  // on doit voir le succès
  expect(await screen.findByText(/Email vérifié avec succès/i)).toBeInTheDocument()

  // on avance le temps (3s)
  jest.advanceTimersByTime(3000)

  // attendre la redirection
  await waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith("/auth/signin")
  })
})



test("erreur: userId manquant → affiche erreur", async () => {
  getMock.mockReturnValue(null)

  render(<EmailVerificationContent />)

  await screen.findByText(/Erreur de vérification/i)
})

test("erreur API: fetch non ok → affiche erreur", async () => {
  getMock.mockReturnValue("user123")
  ;(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false })

  render(<EmailVerificationContent />)

  await screen.findByText(/Erreur de vérification/i)
})

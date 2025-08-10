import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SignUpForm } from '../components/auth/signup-form'

// Mock du contexte d'auth pour contrôler signup()
const signupMock = jest.fn().mockResolvedValue(undefined)
jest.mock('../contexts/auth-context', () => ({
  useAuth: () => ({ signup: signupMock }),
}))

// (Optionnel) mocker les sous-composants décoratifs pour simplifier
jest.mock('../components/auth/oauth-buttons', () => ({
  OAuthButtons: ({ mode }: { mode: string }) => <div data-testid="oauth-buttons">oauth-{mode}</div>,
}))
jest.mock('../components/auth/auth-separator', () => ({
  AuthSeparator: () => <hr data-testid="auth-separator" />,
}))

describe('SignUpForm', () => {
  beforeEach(() => {
    signupMock.mockClear()
  })

  it('soumet le formulaire et appelle signup avec les bonnes données', async () => {
    render(<SignUpForm />)

    // Remplir le formulaire
// Remplir le formulaire (utilise les placeholders, uniques)
fireEvent.change(screen.getByPlaceholderText('Votre prénom'), { target: { value: 'Alice' } })
fireEvent.change(screen.getByPlaceholderText('Votre nom'),    { target: { value: 'Doe' } })
fireEvent.change(screen.getByPlaceholderText('votre@email.com'), { target: { value: 'alice@test.com' } })
fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), { target: { value: 'secret123' } })


    // Soumettre
    fireEvent.click(screen.getByRole('button', { name: /Créer mon compte RepAIr/i }))

    await waitFor(() => {
      expect(signupMock).toHaveBeenCalledTimes(1)
      expect(signupMock).toHaveBeenCalledWith({
        firstName: 'Alice',
        lastName: 'Doe',
        email: 'alice@test.com',
        password: 'secret123',
      })
    })
  })

  it('désactive le bouton pendant le chargement', async () => {
    // On retarde la résolution pour observer l'état "loading"
    const deferred = new Promise<void>((resolve) => setTimeout(resolve, 50))
    signupMock.mockImplementationOnce(() => deferred)

    render(<SignUpForm />)

fireEvent.change(screen.getByPlaceholderText('Votre prénom'), { target: { value: 'Alice' } })
fireEvent.change(screen.getByPlaceholderText('Votre nom'),    { target: { value: 'Doe' } })
fireEvent.change(screen.getByPlaceholderText('votre@email.com'), { target: { value: 'alice@test.com' } })
fireEvent.change(screen.getByPlaceholderText('Votre mot de passe'), { target: { value: 'secret123' } })


    const submitBtn = screen.getByRole('button', { name: /Créer mon compte RepAIr/i })
    fireEvent.click(submitBtn)

    // Le bouton doit être désactivé pendant l'appel
    expect(submitBtn).toBeDisabled()

    // Laisse finir la promesse
    await deferred
  })
})

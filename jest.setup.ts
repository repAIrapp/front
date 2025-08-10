import '@testing-library/jest-dom'
import '@testing-library/jest-dom'

// évite que alert casse les tests
window.alert = jest.fn()

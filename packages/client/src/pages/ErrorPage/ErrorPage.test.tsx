import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { createStore } from '../../redux/store'

import {
  MemoryRouter,
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom'
import { ErrorPage as $ErrorPage } from './ErrorPage'
const initialState = window.initialState

delete window.initialState

const store = createStore(JSON.parse(initialState ?? '{}'))

import { Provider } from 'react-redux'

const ErrorPage = () => (
  <Provider store={store}>
    <$ErrorPage />
  </Provider>
)

// Mock the useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

// Mock the useRouteError hook
jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useRouteError: jest.fn(),
  isRouteErrorResponse: jest.fn(),
}))

describe('ErrorPage component', () => {
  beforeEach(() => {
    // Reset mocks and provide a default error value
    ;(useNavigate as jest.Mock).mockClear()
    ;(useRouteError as jest.Mock).mockClear()
    ;(useRouteError as jest.Mock).mockReturnValue({
      status: 404,
      message: 'Page not found',
    })
    ;(isRouteErrorResponse as unknown as jest.Mock).mockReturnValue(true)
  })

  test.skip('Snapshot', () => {
    const wrapper = render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('renders the correct error message', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    )

    const errorMessage = screen.getByText('Page not found')
    expect(errorMessage).toBeInTheDocument()
  })

  it('renders a "Вернуться" button', () => {
    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    )

    const backButton = screen.getByText('Вернуться')
    expect(backButton).toBeInTheDocument()
  })

  it('calls the navigate function when the "Вернуться" button is clicked', () => {
    const mockNavigate = jest.fn()
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)

    render(
      <MemoryRouter>
        <ErrorPage />
      </MemoryRouter>
    )

    const backButton = screen.getByText('Вернуться')
    fireEvent.click(backButton)

    expect(mockNavigate).toHaveBeenCalledWith(-1)
  })
})

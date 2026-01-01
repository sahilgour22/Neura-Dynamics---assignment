import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import ProductListingPage from '../../pages/ProductListingPage'
import productsReducer from '../../store/slices/productsSlice'
import filtersReducer from '../../store/slices/filtersSlice'
import favoritesReducer from '../../store/slices/favoritesSlice'

// Mock fetch
global.fetch = vi.fn()

const mockProducts = [
  { id: 1, title: 'Laptop Computer', category: 'electronics', price: 999.99 },
  { id: 2, title: 'Cotton T-Shirt', category: 'clothing', price: 19.99 },
  { id: 3, title: 'Smart Phone', category: 'electronics', price: 599.99 },
]

const createMockStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      products: {
        items: mockProducts,
        categories: ['electronics', 'clothing'],
        selectedProduct: null,
        loading: false,
        error: null,
      },
      filters: {
        searchQuery: '',
        selectedCategory: '',
        sortBy: 'none',
      },
      favorites: {
        items: [],
      },
    },
  })
}

const renderWithProviders = (component, store) => {
  return render(
    <Provider store={store}>
      <BrowserRouter>{component}</BrowserRouter>
    </Provider>
  )
}

describe('Search Integration', () => {
  let store
  let user

  beforeEach(() => {
    store = createMockStore()
    user = userEvent.setup()
  })

  it('should filter products by search query', async () => {
    renderWithProviders(<ProductListingPage />, store)

    // Initially all products should be visible
    expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    expect(screen.getByText('Cotton T-Shirt')).toBeInTheDocument()
    expect(screen.getByText('Smart Phone')).toBeInTheDocument()

    // Type in search box
    const searchInput = screen.getByLabelText(/search products by title/i)
    await user.type(searchInput, 'Laptop')

    // Wait for debounced search
    await waitFor(
      () => {
        expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
        expect(screen.queryByText('Cotton T-Shirt')).not.toBeInTheDocument()
        expect(screen.queryByText('Smart Phone')).not.toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('should show no results when search query matches nothing', async () => {
    renderWithProviders(<ProductListingPage />, store)

    const searchInput = screen.getByLabelText(/search products by title/i)
    await user.type(searchInput, 'NonExistentProduct')

    await waitFor(
      () => {
        expect(screen.getByText(/No products found/i)).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })

  it('should be case insensitive', async () => {
    renderWithProviders(<ProductListingPage />, store)

    const searchInput = screen.getByLabelText(/search products by title/i)
    await user.type(searchInput, 'laptop')

    await waitFor(
      () => {
        expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
      },
      { timeout: 500 }
    )
  })
})


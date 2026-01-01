import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import ProductListingPage from '../../pages/ProductListingPage'
import productsReducer from '../../store/slices/productsSlice'
import filtersReducer from '../../store/slices/filtersSlice'
import favoritesReducer from '../../store/slices/favoritesSlice'

const mockProducts = [
  { id: 1, title: 'Laptop Computer', category: 'electronics', price: 999.99 },
  { id: 2, title: 'Cotton T-Shirt', category: 'clothing', price: 19.99 },
  { id: 3, title: 'Smart Phone', category: 'electronics', price: 599.99 },
  { id: 4, title: 'Jeans', category: 'clothing', price: 49.99 },
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

describe('Filter Integration', () => {
  let store
  let user

  beforeEach(() => {
    store = createMockStore()
    user = userEvent.setup()
  })

  it('should filter products by category', async () => {
    renderWithProviders(<ProductListingPage />, store)

    // Initially all products should be visible
    expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    expect(screen.getByText('Cotton T-Shirt')).toBeInTheDocument()

    // Select electronics category
    const categorySelect = screen.getByLabelText(/filter products by category/i)
    await user.selectOptions(categorySelect, 'electronics')

    // Only electronics should be visible
    expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    expect(screen.getByText('Smart Phone')).toBeInTheDocument()
    expect(screen.queryByText('Cotton T-Shirt')).not.toBeInTheDocument()
    expect(screen.queryByText('Jeans')).not.toBeInTheDocument()
  })

  it('should sort products by price ascending', async () => {
    renderWithProviders(<ProductListingPage />, store)

    const sortSelect = screen.getByLabelText(/sort products by price/i)
    await user.selectOptions(sortSelect, 'price-asc')

    const productCards = screen.getAllByText(/\$\d+\.\d{2}/)
    const prices = productCards.map((card) => {
      const text = card.textContent
      return parseFloat(text.replace('$', ''))
    })

    // Check if prices are in ascending order
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1])
    }
  })

  it('should sort products by price descending', async () => {
    renderWithProviders(<ProductListingPage />, store)

    const sortSelect = screen.getByLabelText(/sort products by price/i)
    await user.selectOptions(sortSelect, 'price-desc')

    const productCards = screen.getAllByText(/\$\d+\.\d{2}/)
    const prices = productCards.map((card) => {
      const text = card.textContent
      return parseFloat(text.replace('$', ''))
    })

    // Check if prices are in descending order
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1])
    }
  })

  it('should combine category filter and price sort', async () => {
    renderWithProviders(<ProductListingPage />, store)

    // Filter by electronics
    const categorySelect = screen.getByLabelText(/filter products by category/i)
    await user.selectOptions(categorySelect, 'electronics')

    // Sort by price ascending
    const sortSelect = screen.getByLabelText(/sort products by price/i)
    await user.selectOptions(sortSelect, 'price-asc')

    // Should only show electronics, sorted by price
    expect(screen.getByText('Smart Phone')).toBeInTheDocument()
    expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    expect(screen.queryByText('Cotton T-Shirt')).not.toBeInTheDocument()

    // Check order (Smart Phone should come before Laptop)
    const productCards = screen.getAllByText(/\$\d+\.\d{2}/)
    expect(parseFloat(productCards[0].textContent.replace('$', ''))).toBe(599.99)
    expect(parseFloat(productCards[1].textContent.replace('$', ''))).toBe(999.99)
  })

  it('should reset filters when reset button is clicked', async () => {
    renderWithProviders(<ProductListingPage />, store)

    // Apply filters
    const categorySelect = screen.getByLabelText(/filter products by category/i)
    await user.selectOptions(categorySelect, 'electronics')
    const sortSelect = screen.getByLabelText(/sort products by price/i)
    await user.selectOptions(sortSelect, 'price-asc')

    // Reset filters
    const resetButton = screen.getByLabelText(/reset all filters/i)
    await user.click(resetButton)

    // All products should be visible again
    expect(screen.getByText('Laptop Computer')).toBeInTheDocument()
    expect(screen.getByText('Cotton T-Shirt')).toBeInTheDocument()
    expect(screen.getByText('Smart Phone')).toBeInTheDocument()
    expect(screen.getByText('Jeans')).toBeInTheDocument()
  })
})


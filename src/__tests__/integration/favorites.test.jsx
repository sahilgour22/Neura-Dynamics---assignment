import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { configureStore } from '@reduxjs/toolkit'
import ProductDetailPage from '../../pages/ProductDetailPage'
import FavoritesPage from '../../pages/FavoritesPage'
import productsReducer from '../../store/slices/productsSlice'
import filtersReducer from '../../store/slices/filtersSlice'
import favoritesReducer from '../../store/slices/favoritesSlice'

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
)

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  description: 'Test description',
  rating: { rate: 4.5, count: 100 },
}

const createMockStore = (initialFavorites = []) => {
  return configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      favorites: favoritesReducer,
    },
    preloadedState: {
      products: {
        items: [],
        categories: [],
        selectedProduct: mockProduct,
        loading: false,
        categoriesLoading: false,
        error: null,
      },
      filters: {
        searchQuery: '',
        selectedCategory: '',
        sortBy: 'none',
      },
      favorites: {
        items: initialFavorites,
      },
    },
  })
}

const renderWithProviders = (component, store, initialEntries = ['/']) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/product/:id" element={component} />
          <Route path="/favorites" element={component} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
}

describe('Favorites Integration', () => {
  let store
  let user

  beforeEach(() => {
    // Mock fetch to return the product when fetchProductById is called
    global.fetch = vi.fn((url) => {
      if (url.includes('/products/1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProduct),
        })
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    })
    store = createMockStore()
    user = userEvent.setup()
  })

  it('should add product to favorites from product detail page', async () => {
    renderWithProviders(<ProductDetailPage />, store, ['/product/1'])

    // Wait for product to load
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument()
    })

    // Find and click add to favorites button
    const addButton = screen.getByLabelText(/add to favorites/i)
    expect(addButton).toBeInTheDocument()

    await user.click(addButton)

    // Check that button text changes to remove
    await waitFor(() => {
      expect(screen.getByLabelText(/remove from favorites/i)).toBeInTheDocument()
    })

    // Verify product is in favorites store
    const state = store.getState()
    expect(state.favorites.items).toHaveLength(1)
    expect(state.favorites.items[0].id).toBe(mockProduct.id)
  })

  it('should remove product from favorites from product detail page', async () => {
    const storeWithFavorite = createMockStore([mockProduct])
    renderWithProviders(<ProductDetailPage />, storeWithFavorite, ['/product/1'])

    // Wait for product to load
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument()
    })

    // Button should show remove
    const removeButton = screen.getByLabelText(/remove from favorites/i)
    expect(removeButton).toBeInTheDocument()

    await user.click(removeButton)

    // Check that button text changes to add
    await waitFor(() => {
      expect(screen.getByLabelText(/add to favorites/i)).toBeInTheDocument()
    })

    // Verify product is removed from favorites store
    const state = storeWithFavorite.getState()
    expect(state.favorites.items).toHaveLength(0)
  })

  it('should display favorites on favorites page', () => {
    const storeWithFavorites = createMockStore([mockProduct])
    renderWithProviders(<FavoritesPage />, storeWithFavorites, ['/favorites'])

    expect(screen.getByText('Favorites (1)')).toBeInTheDocument()
    expect(screen.getByText('Test Product')).toBeInTheDocument()
  })

  it('should remove favorite from favorites page', async () => {
    const storeWithFavorites = createMockStore([mockProduct])
    renderWithProviders(<FavoritesPage />, storeWithFavorites, ['/favorites'])

    expect(screen.getByText('Test Product')).toBeInTheDocument()

    // Click remove button
    const removeButton = screen.getByLabelText(/Remove.*from favorites/i)
    await user.click(removeButton)

    // Product should be removed
    await waitFor(() => {
      expect(screen.queryByText('Test Product')).not.toBeInTheDocument()
    })

    // Verify it's removed from store
    const state = storeWithFavorites.getState()
    expect(state.favorites.items).toHaveLength(0)
  })

  it('should not add duplicate products to favorites', async () => {
    const storeWithFavorite = createMockStore([mockProduct])
    renderWithProviders(<ProductDetailPage />, storeWithFavorite, ['/product/1'])

    // Wait for product to load
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument()
    })

    // Try to add again (button should show remove)
    const removeButton = screen.getByLabelText(/remove from favorites/i)
    await user.click(removeButton)
    await user.click(screen.getByLabelText(/add to favorites/i))

    // Should still only have one
    const state = storeWithFavorite.getState()
    expect(state.favorites.items).toHaveLength(1)
  })

  it('should show empty state when no favorites', () => {
    renderWithProviders(<FavoritesPage />, store, ['/favorites'])

    expect(screen.getByText(/You haven't added any favorites yet/i)).toBeInTheDocument()
  })
})


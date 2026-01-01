import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import FavoritesPage from '../FavoritesPage'
import favoritesReducer from '../../store/slices/favoritesSlice'

const createMockStore = (initialFavorites = []) => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
    },
    preloadedState: {
      favorites: {
        items: initialFavorites,
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

describe('FavoritesPage', () => {
  const mockProduct = {
    id: 1,
    title: 'Favorite Product',
    price: 99.99,
    category: 'electronics',
    image: 'https://example.com/image.jpg',
  }

  it('should display empty state when no favorites', () => {
    const store = createMockStore()
    renderWithProviders(<FavoritesPage />, store)

    expect(screen.getByText(/You haven't added any favorites yet/i)).toBeInTheDocument()
  })

  it('should display favorites when they exist', () => {
    const store = createMockStore([mockProduct])
    renderWithProviders(<FavoritesPage />, store)

    expect(screen.getByText('Favorites (1)')).toBeInTheDocument()
    expect(screen.getByText('Favorite Product')).toBeInTheDocument()
  })

  it('should remove favorite when remove button is clicked', () => {
    const store = createMockStore([mockProduct])
    renderWithProviders(<FavoritesPage />, store)

    const removeButton = screen.getByLabelText(/Remove.*from favorites/i)
    fireEvent.click(removeButton)

    expect(screen.queryByText('Favorite Product')).not.toBeInTheDocument()
  })
})


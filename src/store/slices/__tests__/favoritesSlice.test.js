import { describe, it, expect } from 'vitest'
import favoritesReducer, {
  addToFavorites,
  removeFromFavorites,
  clearFavorites,
} from '../favoritesSlice'

describe('favoritesSlice', () => {
  const initialState = {
    items: [],
  }

  const mockProduct1 = { id: 1, title: 'Product 1' }
  const mockProduct2 = { id: 2, title: 'Product 2' }

  it('should return initial state', () => {
    expect(favoritesReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    )
  })

  it('should handle addToFavorites', () => {
    const action = addToFavorites(mockProduct1)
    const state = favoritesReducer(initialState, action)
    expect(state.items).toHaveLength(1)
    expect(state.items[0]).toEqual(mockProduct1)
  })

  it('should not add duplicate product to favorites', () => {
    const stateWithProduct = {
      items: [mockProduct1],
    }
    const action = addToFavorites(mockProduct1)
    const state = favoritesReducer(stateWithProduct, action)
    expect(state.items).toHaveLength(1)
  })

  it('should handle removeFromFavorites', () => {
    const stateWithProducts = {
      items: [mockProduct1, mockProduct2],
    }
    const action = removeFromFavorites(1)
    const state = favoritesReducer(stateWithProducts, action)
    expect(state.items).toHaveLength(1)
    expect(state.items[0]).toEqual(mockProduct2)
  })

  it('should handle clearFavorites', () => {
    const stateWithProducts = {
      items: [mockProduct1, mockProduct2],
    }
    const action = clearFavorites()
    const state = favoritesReducer(stateWithProducts, action)
    expect(state.items).toHaveLength(0)
  })
})


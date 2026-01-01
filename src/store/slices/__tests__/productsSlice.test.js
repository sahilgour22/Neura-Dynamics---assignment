import { describe, it, expect, beforeEach, vi } from 'vitest'
import productsReducer, {
  fetchProducts,
  fetchProductById,
  fetchCategories,
  clearSelectedProduct,
} from '../productsSlice'

// Mock fetch
global.fetch = vi.fn()

describe('productsSlice', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  const initialState = {
    items: [],
    categories: [],
    selectedProduct: null,
    loading: false,
    error: null,
  }

  describe('reducer', () => {
    it('should return initial state', () => {
      expect(productsReducer(undefined, { type: 'unknown' })).toEqual(
        initialState
      )
    })

    it('should handle clearSelectedProduct', () => {
      const state = {
        ...initialState,
        selectedProduct: { id: 1, title: 'Test' },
      }
      const action = clearSelectedProduct()
      const result = productsReducer(state, action)
      expect(result.selectedProduct).toBeNull()
    })
  })

  describe('fetchProducts', () => {
    it('should handle pending state', () => {
      const action = { type: fetchProducts.pending.type }
      const state = productsReducer(initialState, action)
      expect(state.loading).toBe(true)
      expect(state.error).toBeNull()
    })

    it('should handle fulfilled state', () => {
      const mockProducts = [
        { id: 1, title: 'Product 1' },
        { id: 2, title: 'Product 2' },
      ]
      const action = {
        type: fetchProducts.fulfilled.type,
        payload: mockProducts,
      }
      const state = productsReducer(initialState, action)
      expect(state.loading).toBe(false)
      expect(state.items).toEqual(mockProducts)
      expect(state.error).toBeNull()
    })

    it('should handle rejected state', () => {
      const errorMessage = 'Failed to fetch'
      const action = {
        type: fetchProducts.rejected.type,
        payload: errorMessage,
      }
      const state = productsReducer(initialState, action)
      expect(state.loading).toBe(false)
      expect(state.error).toBe(errorMessage)
    })
  })

  describe('fetchProductById', () => {
    it('should handle fulfilled state', () => {
      const mockProduct = { id: 1, title: 'Product 1' }
      const action = {
        type: fetchProductById.fulfilled.type,
        payload: mockProduct,
      }
      const state = productsReducer(initialState, action)
      expect(state.loading).toBe(false)
      expect(state.selectedProduct).toEqual(mockProduct)
    })
  })

  describe('fetchCategories', () => {
    it('should handle fulfilled state', () => {
      const mockCategories = ['electronics', 'jewelery']
      const action = {
        type: fetchCategories.fulfilled.type,
        payload: mockCategories,
      }
      const state = productsReducer(initialState, action)
      expect(state.loading).toBe(false)
      expect(state.categories).toEqual(mockCategories)
    })
  })
})


import { describe, it, expect } from 'vitest'
import {
  selectFilteredProducts,
  selectIsFavorite,
} from '../selectors'

describe('selectors', () => {
  const mockState = {
    products: {
      items: [
        { id: 1, title: 'Laptop', category: 'electronics', price: 999.99 },
        { id: 2, title: 'T-Shirt', category: 'clothing', price: 19.99 },
        { id: 3, title: 'Phone', category: 'electronics', price: 599.99 },
      ],
    },
    filters: {
      searchQuery: '',
      selectedCategory: '',
      sortBy: 'none',
    },
    favorites: {
      items: [{ id: 1, title: 'Laptop' }],
    },
  }

  describe('selectFilteredProducts', () => {
    it('should return all products when no filters applied', () => {
      const result = selectFilteredProducts(mockState)
      expect(result).toHaveLength(3)
    })

    it('should filter by search query', () => {
      const stateWithSearch = {
        ...mockState,
        filters: { ...mockState.filters, searchQuery: 'Laptop' },
      }
      const result = selectFilteredProducts(stateWithSearch)
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Laptop')
    })

    it('should filter by category', () => {
      const stateWithCategory = {
        ...mockState,
        filters: { ...mockState.filters, selectedCategory: 'electronics' },
      }
      const result = selectFilteredProducts(stateWithCategory)
      expect(result).toHaveLength(2)
      expect(result.every((p) => p.category === 'electronics')).toBe(true)
    })

    it('should sort by price ascending', () => {
      const stateWithSort = {
        ...mockState,
        filters: { ...mockState.filters, sortBy: 'price-asc' },
      }
      const result = selectFilteredProducts(stateWithSort)
      expect(result[0].price).toBe(19.99)
      expect(result[2].price).toBe(999.99)
    })

    it('should sort by price descending', () => {
      const stateWithSort = {
        ...mockState,
        filters: { ...mockState.filters, sortBy: 'price-desc' },
      }
      const result = selectFilteredProducts(stateWithSort)
      expect(result[0].price).toBe(999.99)
      expect(result[2].price).toBe(19.99)
    })

    it('should combine search, category, and sort filters', () => {
      const stateWithAllFilters = {
        ...mockState,
        filters: {
          searchQuery: 'Phone',
          selectedCategory: 'electronics',
          sortBy: 'price-asc',
        },
      }
      const result = selectFilteredProducts(stateWithAllFilters)
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Phone')
    })
  })

  describe('selectIsFavorite', () => {
    it('should return true if product is in favorites', () => {
      const result = selectIsFavorite(mockState, 1)
      expect(result).toBe(true)
    })

    it('should return false if product is not in favorites', () => {
      const result = selectIsFavorite(mockState, 2)
      expect(result).toBe(false)
    })
  })
})


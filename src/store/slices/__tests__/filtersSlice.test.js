import { describe, it, expect } from 'vitest'
import filtersReducer, {
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  resetFilters,
} from '../filtersSlice'

describe('filtersSlice', () => {
  const initialState = {
    searchQuery: '',
    selectedCategory: '',
    sortBy: 'none',
  }

  it('should return initial state', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual(
      initialState
    )
  })

  it('should handle setSearchQuery', () => {
    const action = setSearchQuery('test query')
    const state = filtersReducer(initialState, action)
    expect(state.searchQuery).toBe('test query')
  })

  it('should handle setSelectedCategory', () => {
    const action = setSelectedCategory('electronics')
    const state = filtersReducer(initialState, action)
    expect(state.selectedCategory).toBe('electronics')
  })

  it('should handle setSortBy', () => {
    const action = setSortBy('price-asc')
    const state = filtersReducer(initialState, action)
    expect(state.sortBy).toBe('price-asc')
  })

  it('should handle resetFilters', () => {
    const stateWithFilters = {
      searchQuery: 'test',
      selectedCategory: 'electronics',
      sortBy: 'price-asc',
    }
    const action = resetFilters()
    const state = filtersReducer(stateWithFilters, action)
    expect(state).toEqual(initialState)
  })
})


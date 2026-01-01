import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchQuery: '',
  selectedCategory: '',
  sortBy: 'none', // 'none', 'price-asc', 'price-desc'
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    resetFilters: (state) => {
      state.searchQuery = ''
      state.selectedCategory = ''
      state.sortBy = 'none'
    },
  },
})

export const { setSearchQuery, setSelectedCategory, setSortBy, resetFilters } =
  filtersSlice.actions
export default filtersSlice.reducer


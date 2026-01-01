import { createSelector } from '@reduxjs/toolkit'

// Select all products
export const selectAllProducts = (state) => state.products.items

// Select filters
export const selectSearchQuery = (state) => state.filters.searchQuery
export const selectSelectedCategory = (state) => state.filters.selectedCategory
export const selectSortBy = (state) => state.filters.sortBy

// Select favorites
export const selectFavorites = (state) => state.favorites.items

// Select filtered and sorted products
export const selectFilteredProducts = createSelector(
  [selectAllProducts, selectSearchQuery, selectSelectedCategory, selectSortBy],
  (products, searchQuery, selectedCategory, sortBy) => {
    let filtered = [...products]

    // Filter by search query (title)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(query)
      )
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      )
    }

    // Sort by price
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price)
    }

    return filtered
  }
)

// Select product by ID
export const selectProductById = (state, productId) =>
  state.products.items.find((product) => product.id === productId)

// Select selected product
export const selectSelectedProduct = (state) => state.products.selectedProduct

// Check if product is favorited
export const selectIsFavorite = (state, productId) =>
  state.favorites.items.some((item) => item.id === productId)


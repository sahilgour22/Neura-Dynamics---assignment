import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  setSearchQuery,
  setSelectedCategory,
  setSortBy,
  resetFilters,
} from '../store/slices/filtersSlice'
import { fetchCategories } from '../store/slices/productsSlice'
import {
  selectSearchQuery,
  selectSelectedCategory,
  selectSortBy,
} from '../store/selectors'

function SearchAndFilter() {
  const dispatch = useAppDispatch()
  const searchQuery = useAppSelector(selectSearchQuery)
  const selectedCategory = useAppSelector(selectSelectedCategory)
  const sortBy = useAppSelector(selectSortBy)
  const categories = useAppSelector((state) => state.products.categories)
  const categoriesLoaded = useAppSelector((state) => state.products.categories.length > 0)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  // Fetch categories on mount (only once)
  useEffect(() => {
    if (!categoriesLoaded) {
      dispatch(fetchCategories())
    }
  }, [dispatch, categoriesLoaded])

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchQuery(localSearchQuery))
    }, 300)

    return () => clearTimeout(timer)
  }, [localSearchQuery, dispatch])

  const handleCategoryChange = (e) => {
    dispatch(setSelectedCategory(e.target.value))
  }

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value))
  }

  const handleReset = () => {
    setLocalSearchQuery('')
    dispatch(resetFilters())
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Input */}
        <div>
          <label
            htmlFor="search"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Search by Title
          </label>
          <input
            type="text"
            id="search"
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Search products by title"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Filter by Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Filter products by category"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Sort */}
        <div>
          <label
            htmlFor="sort"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sort by Price
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={handleSortChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Sort products by price"
          >
            <option value="none">None</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Reset Button */}
      {(searchQuery || selectedCategory || sortBy !== 'none') && (
        <div className="mt-4">
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            aria-label="Reset all filters"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default SearchAndFilter


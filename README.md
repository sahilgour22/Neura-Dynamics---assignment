# Product Dashboard

A modern product dashboard application built with React, Redux Toolkit, and Testing Libraries. This application demonstrates proficiency in building modern frontend applications with state management, API integration, and comprehensive testing.

## Features

- **Product Listing Page**: Display products in a responsive grid layout
- **Search & Filter**: 
  - Debounced search by product title
  - Filter by category
  - Sort by price (ascending/descending)
- **Product Detail Page**: View complete product information and add to favorites
- **Favorites Page**: Manage your favorite products with add/remove functionality
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Accessibility**: ARIA labels and semantic HTML for better accessibility

## Tech Stack

- **React 18** - UI library with functional components and hooks
- **Redux Toolkit** - State management for products, filters, and favorites
- **React Router** - Client-side routing
- **Vitest** - Unit and integration testing
- **Testing Library** - Component and integration testing utilities
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server

## API

This application uses the [Fake Store API](https://fakestoreapi.com) to fetch product data.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd product-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Testing

### Run Tests

```bash
npm test
```

### Run Tests with UI

```bash
npm run test:ui
```

### Run Tests with Coverage

```bash
npm run test:coverage
```

### Test Structure

- **Unit Tests**: Located in `src/store/slices/__tests__/` and `src/components/__tests__/`
  - Redux slice tests
  - Component tests
  - Selector tests

- **Integration Tests**: Located in `src/__tests__/integration/`
  - Search functionality
  - Filter functionality
  - Favorites functionality

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Layout.jsx      # Main layout with navigation
│   ├── ProductCard.jsx # Product card component
│   └── SearchAndFilter.jsx # Search and filter controls
├── pages/              # Page components
│   ├── ProductListingPage.jsx
│   ├── ProductDetailPage.jsx
│   └── FavoritesPage.jsx
├── store/              # Redux store configuration
│   ├── store.js        # Store setup
│   ├── hooks.js        # Typed Redux hooks
│   ├── selectors.js    # Redux selectors
│   └── slices/         # Redux slices
│       ├── productsSlice.js
│       ├── filtersSlice.js
│       └── favoritesSlice.js
├── test/               # Test setup
│   └── setup.js
├── __tests__/          # Integration tests
│   └── integration/
├── App.jsx             # Main app component
├── main.jsx            # Entry point
└── index.css           # Global styles
```

## Redux State Management

The application uses Redux Toolkit with three main slices:

1. **productsSlice**: Manages product data, loading states, and API calls
2. **filtersSlice**: Manages search query, category filter, and sort options
3. **favoritesSlice**: Manages favorite products

### Async Operations

The application uses Redux Toolkit's `createAsyncThunk` for API calls:
- `fetchProducts()` - Fetches all products
- `fetchProductById(id)` - Fetches a single product
- `fetchCategories()` - Fetches product categories

### Selectors

Memoized selectors are used for efficient state access:
- `selectFilteredProducts` - Returns filtered and sorted products
- `selectIsFavorite` - Checks if a product is in favorites

## Deployment

This application can be deployed to:
- **Vercel**: Connect your GitHub repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **Render**: Connect your repository and set build command to `npm run build`

### Deployment Steps (Vercel)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy!

## Notes

- Search is debounced by 300ms to optimize performance
- All API calls are handled through Redux thunks
- The application follows modern React best practices with functional components and hooks
- Comprehensive test coverage for Redux slices, components, and integration scenarios
- Responsive design works on mobile, tablet, and desktop devices

## License

This project is created for assignment purposes.


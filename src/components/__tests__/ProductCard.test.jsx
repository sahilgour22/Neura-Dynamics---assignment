import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import ProductCard from '../ProductCard'

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  category: 'electronics',
  image: 'https://example.com/image.jpg',
  rating: { rate: 4.5, count: 100 },
}

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('ProductCard', () => {
  it('should render product information', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('electronics')).toBeInTheDocument()
    expect(screen.getByText('4.5 ⭐ (100)')).toBeInTheDocument()
  })

  it('should have correct link to product detail page', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/product/1')
  })

  it('should have accessible image with alt text', () => {
    renderWithRouter(<ProductCard product={mockProduct} />)

    const image = screen.getByAltText('Test Product')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockProduct.image)
  })
})


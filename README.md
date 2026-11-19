# DummyShop

DummyShop is a responsive product discovery application built with React, TanStack Query, and Tailwind CSS. It retrieves product data from the [DummyJSON Products API](https://dummyjson.com/products), supports search and category filtering, paginates product results, and stores favorites in browser `localStorage`.


## Features

- Infinite page loading with a load-more control
- Instant product search with a 350 ms debounce
- Category filters based on the DummyJSON category list
- Responsive product grid for mobile, tablet, and desktop
- Local favorite selection and favorite count
- Loading skeletons, empty states, and API error states
- Tailwind CSS utility-based responsive design

## Technologies

- React 19
- TanStack React Query 5
- Tailwind CSS 4
- Vite 8
- Native Fetch API
- ESLint

## Getting Started

### Requirements

- Node.js 20 or newer
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open the local address printed by Vite in the terminal.

### Production Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
├── api/
│   └── productsApi.js       # DummyJSON HTTP requests
├── components/
│   ├── Navbar.jsx           # Search and favorites header
│   ├── ProductCard.jsx      # Individual product card
│   └── ProductFeed.jsx      # Grid, loading, empty, and pagination states
├── hooks/
│   └── useProducts.js       # TanStack Query hooks
├── App.jsx                  # Application state and data flow
├── index.css                # Tailwind CSS entry
└── main.jsx                 # React and QueryClient entry point
```

## How It Works

The application uses `useInfiniteQuery` to retrieve products in pages of 12. The query key contains the active search text and category, so changing either value starts a new query.

```text
Search or category
      |
      v
App state changes
      |
      v
useProducts updates the query key
      |
      v
fetchProducts calls DummyJSON
      |
      v
Pages are combined with flatMap
      |
      v
ProductFeed renders ProductCard components
```

The API request is based on the active view:

```text
All products: /products?limit=12&skip=0
Search:       /products/search?q=phone&limit=12&skip=0
Category:     /products/category/laptops?limit=12&skip=0
```

Favorites are not sent to a DummyJSON endpoint. Their product IDs are stored locally in the browser:

```text
localStorage key: dummyshop-favorites
```

This keeps favorite selections available after a page refresh without requiring a backend.

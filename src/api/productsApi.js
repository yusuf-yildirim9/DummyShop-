const API_URL = "https://dummyjson.com/products"

export async function fetchProducts({ query = "", category = "", skip = 0, limit = 12, signal }) {
  const endpoint = query.trim()
    ? `${API_URL}/search?q=${encodeURIComponent(query.trim())}`
    : category
      ? `${API_URL}/category/${encodeURIComponent(category)}`
      : API_URL

  const response = await fetch(`${endpoint}${endpoint.includes("?") ? "&" : "?"}limit=${limit}&skip=${skip}`, { signal })

  if (!response.ok) {
    throw new Error("Something went wrong while loading products.")
  }

  return response.json()
}

export async function fetchCategories() {
  const response = await fetch(`${API_URL}/category-list`)

  if (!response.ok) {
    throw new Error("Something went wrong while loading categories.")
  }

  return response.json()
}

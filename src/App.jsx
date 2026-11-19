import { useEffect, useMemo, useState } from "react"
import Navbar from "./components/Navbar"
import ProductFeed from "./components/ProductFeed"
import { useCategories, useProducts } from "./hooks/useProducts"

const FAVORITES_KEY = "dummyshop-favorites"

function App() {
  const [search, setSearch] = useState("")
  const [activeSearch, setActiveSearch] = useState("")
  const [category, setCategory] = useState("")
  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY) || "[]")
    } catch {
      return []
    }
  })

  const { data: categories = [] } = useCategories()
  const productsQuery = useProducts(activeSearch, category)
  const products = useMemo(
    () => productsQuery.data?.pages.flatMap((page) => page.products) || [],
    [productsQuery.data],
  )
  const visibleProducts = showFavorites ? products.filter((product) => favorites.includes(product.id)) : products

  useEffect(() => {
    const timer = setTimeout(() => setActiveSearch(search), 350)
    return () => clearTimeout(timer)
  }, [search])

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  function toggleFavorite(productId) {
    setFavorites((current) =>
      current.includes(productId) ? current.filter((id) => id !== productId) : [...current, productId],
    )
  }

  function selectCategory(nextCategory) {
    setCategory(nextCategory)
    setShowFavorites(false)
  }

  const title = showFavorites ? "Your Favorites" : "Discover Products"
  const subtitle = showFavorites ? "Your saved products are here." : "Explore products and add them to your favorites."

  return (
    <div className="min-h-screen bg-[#111827] text-[#f5f7fb]">
      <div className="mx-auto w-[calc(100%-28px)] max-w-[1180px] sm:w-[calc(100%-40px)]">
      <Navbar
        search={search}
        onSearchChange={setSearch}
        favoriteCount={favorites.length}
        showFavorites={showFavorites}
        onShowFavorites={() => setShowFavorites((current) => !current)}
      />
      <main className="py-9 sm:py-14">
        <section className="mb-8 flex items-end justify-between sm:mb-[34px]">
          <div>
            <p className="mb-2 text-xs font-extrabold tracking-[2px] text-[#ffcb4d]">DISCOVER NEW PRODUCTS</p>
            <h1 className="m-0 text-[32px] leading-[1.05] font-bold tracking-[-2px] sm:text-[48px]">{title}</h1>
            <p className="mt-3.5 mb-0 text-base text-[#9aa8be]">{subtitle}</p>
          </div>
          <span className="text-[46px] leading-[.7] text-[#ffcb4d] opacity-90 sm:text-[72px]">✦</span>
        </section>

        {!showFavorites && (
          <nav className="flex gap-2.5 overflow-x-auto px-0 pt-0.5 pb-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Product categories">
            <button type="button" className={`shrink-0 rounded-lg border px-4 py-2.5 capitalize transition-colors ${!category ? "border-[#4285ef] bg-[#4285ef] text-white" : "border-[#33435f] bg-[#18243a] text-[#9aa8be] hover:border-[#4285ef] hover:text-white"}`} onClick={() => selectCategory("")}>All</button>
            {categories.slice(0, 7).map((item) => (
              <button type="button" className={`shrink-0 rounded-lg border px-4 py-2.5 capitalize transition-colors ${category === item ? "border-[#4285ef] bg-[#4285ef] text-white" : "border-[#33435f] bg-[#18243a] text-[#9aa8be] hover:border-[#4285ef] hover:text-white"}`} key={item} onClick={() => selectCategory(item)}>
                {item.replaceAll("-", " ")}
              </button>
            ))}
          </nav>
        )}

        {productsQuery.isError ? (
          <div className="my-[30px] rounded-xl border border-dashed border-[#744552] px-5 py-[70px] text-center">
            <h2 className="mt-3 mb-2 text-xl font-bold">Something went wrong</h2>
            <p className="mt-0 mb-[22px] text-[#9aa8be]">{productsQuery.error.message}</p>
            <button type="button" className="rounded-lg border border-[#5077b7] bg-[#214578] px-5 py-3 text-[#e6efff] transition-colors hover:bg-[#2f65b0]" onClick={() => productsQuery.refetch()}>Try Again</button>
          </div>
        ) : (
          <ProductFeed
            products={visibleProducts}
            isLoading={productsQuery.isLoading}
            isFetchingNextPage={productsQuery.isFetchingNextPage}
            hasNextPage={showFavorites ? false : productsQuery.hasNextPage}
            onLoadMore={() => productsQuery.fetchNextPage()}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>
      <footer className="border-t border-white/10 py-[34px] text-center text-[13px] text-[#718198]">© 2025 DummyShop · Happy discoveries</footer>
      </div>
    </div>
  )
}

export default App

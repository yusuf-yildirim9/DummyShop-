import ProductCard from "./ProductCard"

function ProductSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-[#33435f] bg-[#1b263b]" aria-hidden="true">
      <div className="h-[155px] animate-pulse bg-[#25344d] sm:h-[220px]" />
      <div className="p-4">
        <div className="mb-3 h-2.5 w-[35%] animate-pulse rounded bg-[#31425e]" />
        <div className="mb-3 h-[15px] animate-pulse rounded bg-[#31425e]" />
        <div className="h-[15px] w-[55%] animate-pulse rounded bg-[#31425e]" />
      </div>
    </div>
  )
}

function ProductFeed({ products, isLoading, isFetchingNextPage, hasNextPage, onLoadMore, favorites, onToggleFavorite }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)}
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="my-[30px] rounded-xl border border-dashed border-[#33435f] px-5 py-[70px] text-center">
        <span className="block text-[42px] text-[#ffcb4d]">⌕</span>
        <h2 className="mt-3 mb-2 text-xl font-bold">No products found</h2>
        <p className="m-0 text-[#9aa8be]">Change your search or category selection and try again.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isFavorite={favorites.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
      <div className="flex justify-center px-0 pt-[34px] pb-2.5">
        {hasNextPage ? (
          <button type="button" className="rounded-lg border border-[#5077b7] bg-[#214578] px-5 py-3 text-[#e6efff] transition-colors hover:bg-[#2f65b0] disabled:cursor-wait disabled:opacity-65" onClick={onLoadMore} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading products..." : "Discover more"}
          </button>
        ) : (
          <p className="text-sm text-[#9aa8be]">You have seen all products</p>
        )}
      </div>
    </>
  )
}

export default ProductFeed

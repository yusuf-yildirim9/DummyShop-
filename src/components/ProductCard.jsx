function HeartIcon({ filled }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`size-[17px] stroke-current stroke-[1.8] ${filled ? "fill-current" : "fill-none"}`}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  )
}

function ProductCard({ product, isFavorite, onToggleFavorite }) {
  return (
    <article className="overflow-hidden rounded-xl border border-[#33435f] bg-[#1b263b] transition duration-200 hover:-translate-y-1 hover:border-[#59749d]">
      <div className="relative grid h-[155px] place-items-center bg-[#f2f4f8] p-3.5 sm:h-[220px]">
        <img src={product.thumbnail} alt={product.title} className="size-full object-contain mix-blend-multiply" loading="lazy" />
        <button
          type="button"
          className={`absolute top-[11px] right-[11px] grid size-[35px] place-items-center rounded-full border bg-white/90 transition-colors ${isFavorite ? "border-[#ff4d67] text-[#ff4d67]" : "border-[#9faab8] text-[#5e6d7f] hover:border-[#ff4d67] hover:text-[#ff4d67]"}`}
          onClick={() => onToggleFavorite(product.id)}
          aria-label={isFavorite ? `Remove ${product.title} from favorites` : `Add ${product.title} to favorites`}
          aria-pressed={isFavorite}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <div className="px-3 py-3 sm:px-4 sm:py-[15px]">
        <div className="mb-1.5 text-[11px] font-bold text-[#778aa6] uppercase">{product.category.replaceAll("-", " ")}</div>
        <h2 className="mb-3.5 overflow-hidden text-sm font-bold text-ellipsis whitespace-nowrap sm:text-base">{product.title}</h2>
        <div className="flex items-center justify-between">
          <strong className="text-[17px] text-[#ffcb4d]">${product.price.toFixed(2)}</strong>
          <span className="text-xs text-[#c8d2e3]">★ {product.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard

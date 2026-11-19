function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  )
}

const Navbar = ({ search, onSearchChange, favoriteCount, showFavorites, onShowFavorites }) => {
  return (
    <header className="flex min-h-[84px] flex-wrap items-center gap-3.5 border-b border-white/15 py-4 sm:flex-nowrap sm:gap-7 sm:py-0">
      <div className="flex items-center gap-2.5 text-[20px] font-extrabold tracking-[-0.5px] whitespace-nowrap">
        <span className="grid size-8 place-items-center rounded-[9px] bg-[#ffcb4d] text-[22px] text-[#17213a]">▦</span>
        <span>Dummy<span className="text-[#ffcb4d]">Shop</span></span>
      </div>
      <label className="order-3 flex w-full items-center gap-2.5 rounded-[10px] border border-[#33435f] bg-[#18243a] px-3.5 py-2.5 text-[#9aa8be] sm:order-0 sm:ml-auto sm:w-[380px]">
        <span className="[&>svg]:size-[18px] [&>svg]:fill-none [&>svg]:stroke-current [&>svg]:stroke-[1.8]"><SearchIcon /></span>
        <input className="w-full border-0 bg-transparent text-[#f5f7fb] outline-none placeholder:text-[#65748c]" value={search} onChange={(event) => onSearchChange(event.target.value)} type="search" placeholder="Search products..." />
      </label>
      <button type="button" className={`flex items-center gap-2 rounded-[9px] border px-3.5 py-2.5 font-semibold text-[#d7e3fa] transition-colors sm:px-[15px] ${showFavorites ? "border-[#6ea2ff] bg-[#2f65b0]" : "border-[#40608e] bg-[#233d67] hover:border-[#6ea2ff] hover:bg-[#2f65b0]"}`} onClick={onShowFavorites}>
        <span className="[&>svg]:size-[17px] [&>svg]:fill-none [&>svg]:stroke-[#ff4d67] [&>svg]:stroke-[1.8]"><HeartIcon /></span>
        <span className="hidden sm:inline">Favorites</span>
        <b className="text-white">{favoriteCount}</b>
      </button>
    </header>
  )
}

export default Navbar

function SearchBar({ filters, onChange, onSubmit }) {
  return (
    <form onSubmit={(event) => { event.preventDefault(); onSubmit?.() }} className="grid gap-3 rounded-lg bg-white p-4 shadow-sm sm:grid-cols-[1fr_auto]">
      <div className="grid gap-3 sm:grid-cols-3">
        <input
          type="text"
          name="make"
          value={filters.make}
          onChange={(e) => onChange({ ...filters, make: e.target.value })}
          placeholder="Make"
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="text"
          name="model"
          value={filters.model}
          onChange={(e) => onChange({ ...filters, model: e.target.value })}
          placeholder="Model"
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="number"
          name="min_price"
          value={filters.min_price}
          onChange={(e) => onChange({ ...filters, min_price: e.target.value })}
          placeholder="Min price"
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
        />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          type="number"
          name="max_price"
          value={filters.max_price}
          onChange={(e) => onChange({ ...filters, max_price: e.target.value })}
          placeholder="Max price"
          className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
        />
        <button
          type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar

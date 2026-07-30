import { useState, useEffect } from 'react'

const categories = [
  { label: 'Sedan', value: 'sedan' },
  { label: 'SUV', value: 'suv' },
  { label: 'Coupe', value: 'coupe' },
  { label: 'Hatchback', value: 'hatchback' },
]

function VehicleForm({ initialData = {}, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    make: '',
    model: '',
    category: 'sedan',
    price: '',
    quantity: '',
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        make: initialData.make || '',
        model: initialData.model || '',
        category: initialData.category || 'sedan',
        price: initialData.price ?? '',
        quantity: initialData.quantity ?? '',
      })
    }
  }, [initialData])

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit({
      make: form.make,
      model: form.model,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg bg-white p-5 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Make</span>
          <input
            type="text"
            value={form.make}
            onChange={(e) => handleChange('make', e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Model</span>
          <input
            type="text"
            value={form.model}
            onChange={(e) => handleChange('model', e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Category</span>
          <select
            value={form.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
          >
            {categories.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Price</span>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={form.price}
            onChange={(e) => handleChange('price', e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-slate-700">Quantity</span>
          <input
            type="number"
            min="0"
            value={form.quantity}
            onChange={(e) => handleChange('quantity', e.target.value)}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2 text-sm"
            required
          />
        </label>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700"
        >
          Save
        </button>
      </div>
    </form>
  )
}

export default VehicleForm

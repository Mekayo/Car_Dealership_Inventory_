import { useState } from 'react'
import { ShoppingCart, ArrowUpRight, Trash2 } from 'lucide-react'

function VehicleCard({ vehicle, onEdit, onDelete, onPurchase, onRestock }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">{vehicle.make} {vehicle.model}</h3>
          <p className="text-sm text-slate-500 capitalize">{vehicle.category}</p>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold text-slate-900">${vehicle.price.toFixed(2)}</p>
          <p className="text-sm text-slate-500">Qty: {vehicle.quantity}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onPurchase(vehicle.id, quantity)}
            className="inline-flex items-center gap-2 rounded bg-emerald-500 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600"
          >
            <ShoppingCart size={16} /> Purchase
          </button>
          <button
            type="button"
            onClick={() => onRestock(vehicle.id, quantity)}
            className="inline-flex items-center gap-2 rounded bg-sky-500 px-3 py-2 text-sm font-medium text-white hover:bg-sky-600"
          >
            <ArrowUpRight size={16} /> Restock
          </button>
        </div>

        <div className="flex gap-2">
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(event) => setQuantity(Number(event.target.value))}
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
          />
          <button
            type="button"
            onClick={() => onEdit(vehicle)}
            className="rounded bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(vehicle)}
            className="rounded bg-rose-500 px-3 py-2 text-sm font-medium text-white hover:bg-rose-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default VehicleCard

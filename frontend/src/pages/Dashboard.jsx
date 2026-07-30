import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import Navbar from '../components/Navbar'
import VehicleCard from '../components/VehicleCard'
import VehicleForm from '../components/VehicleForm'
import SearchBar from '../components/SearchBar'
import ConfirmModal from '../components/ConfirmModal'
import {
  fetchVehicles,
  createVehicle,
  updateVehicle,
  deleteVehicle,
  purchaseVehicle,
  restockVehicle,
} from '../services/api'
import { clearToken } from '../utils/auth'

const emptyVehicle = {
  id: null,
  make: '',
  model: '',
  category: 'sedan',
  price: 0,
  quantity: 0,
}

function Dashboard() {
  const [vehicles, setVehicles] = useState([])
  const [filters, setFilters] = useState({ make: '', model: '', min_price: '', max_price: '' })
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [editingVehicle, setEditingVehicle] = useState(null)
  const [confirmingDelete, setConfirmingDelete] = useState(null)
  const [loading, setLoading] = useState(false)

  const loadVehicles = async (searchFilters = filters) => {
  setLoading(true);

  try {
    const response = await fetchVehicles(searchFilters);
    setVehicles(response.data);
  } catch (error) {
    toast.error("Unable to load vehicles.");
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    loadVehicles()
  }, [])

  const handleSearch = () => {
  loadVehicles(filters);
};

  const handleCreate = async (vehicle) => {
    try {
      await createVehicle(vehicle)
      toast.success('Vehicle created.')
      setEditingVehicle(null)
      loadVehicles()
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Unable to create vehicle.')
    }
  }

  const handleUpdate = async (vehicle) => {
    try {
      await updateVehicle(editingVehicle.id, vehicle)
      toast.success('Vehicle updated.')
      setEditingVehicle(null)
      loadVehicles()
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Unable to update vehicle.')
    }
  }

  const handleDelete = async () => {
    try {
      await deleteVehicle(confirmingDelete.id)
      toast.success('Vehicle removed.')
      setConfirmingDelete(null)
      loadVehicles()
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Unable to remove vehicle.')
    }
  }

  const handlePurchase = async (vehicleId, quantity) => {
    try {
      await purchaseVehicle(vehicleId, quantity)
      toast.success('Purchase completed.')
      loadVehicles()
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Unable to purchase vehicle.')
    }
  }

  const handleRestock = async (vehicleId, quantity) => {
    try {
      await restockVehicle(vehicleId, quantity)
      toast.success('Stock updated.')
      loadVehicles()
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Unable to restock vehicle.')
    }
  }

  const handleLogout = () => {
    clearToken()
  }

  const vehicleList = useMemo(
    () => vehicles,
    [vehicles],
  )

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onLogout={handleLogout} />
      <div className="container py-8">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Inventory Dashboard</h1>
              <p className="mt-1 text-sm text-slate-600">Manage vehicles, stock, and sales from a single dashboard.</p>
            </div>
            <button
              type="button"
              onClick={() => setEditingVehicle(emptyVehicle)}
              className="inline-flex items-center justify-center rounded bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-700"
            >
              Add vehicle
            </button>
          </div>

          <SearchBar filters={filters} onChange={setFilters} onSubmit={handleSearch} />

          <div className="grid gap-4 md:grid-cols-2">
            {loading ? (
              <div className="rounded-lg bg-white p-8 text-center text-slate-700 shadow-sm">Loading vehicles…</div>
            ) : vehicleList.length === 0 ? (
              <div className="rounded-lg bg-white p-8 text-center text-slate-700 shadow-sm">No vehicles found.</div>
            ) : (
              vehicleList.map((vehicle) => (
                <VehicleCard
                  key={vehicle.id}
                  vehicle={vehicle}
                  onEdit={() => setEditingVehicle(vehicle)}
                  onDelete={() => setConfirmingDelete(vehicle)}
                  onPurchase={handlePurchase}
                  onRestock={handleRestock}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {editingVehicle !== null && (
        <div className="fixed inset-0 z-50 overflow-auto bg-slate-900/50 px-4 py-10">
          <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingVehicle.id ? 'Edit vehicle' : 'Add vehicle'}
              </h2>
              <button type="button" onClick={() => setEditingVehicle(null)} className="text-slate-500 hover:text-slate-900">
                Close
              </button>
            </div>
            <VehicleForm
              initialData={editingVehicle}
              onSubmit={editingVehicle.id ? handleUpdate : handleCreate}
              onCancel={() => setEditingVehicle(null)}
            />
          </div>
        </div>
      )}

      {confirmingDelete && (
        <ConfirmModal
          title="Delete vehicle"
          message={`Are you sure you want to delete ${confirmingDelete.make} ${confirmingDelete.model}?`}
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={handleDelete}
          onCancel={() => setConfirmingDelete(null)}
        />
      )}
    </div>
  )
}

export default Dashboard

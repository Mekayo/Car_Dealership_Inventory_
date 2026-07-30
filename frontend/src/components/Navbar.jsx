import { Link, useNavigate } from 'react-router-dom'
import { clearToken, isAuthenticated } from '../utils/auth'

function Navbar({ onLogout }) {
  const navigate = useNavigate()

  const handleLogout = () => {
  clearToken();
  onLogout?.();
  navigate("/login", { replace: true });
};

  return (
    <header className="bg-slate-900 text-white">
      <div className="container flex items-center justify-between py-4">
        <Link to="/dashboard" className="text-xl font-semibold">
          Car Dealership Inventory
        </Link>
        <div className="space-x-3">
          {isAuthenticated() ? (
            <button
              type="button"
              onClick={handleLogout}
              className="rounded bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600"
            >
              Logout
            </button>
          ) : (
            <Link className="rounded bg-slate-700 px-4 py-2 text-sm hover:bg-slate-600" to="/login">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar

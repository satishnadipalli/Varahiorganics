
import { Home, Package, Settings } from 'lucide-react'

export function Sidebar() {
  return (
    <div className="w-64 bg-white h-full shadow-md">
      <div className="flex items-center justify-center h-16 border-b">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </div>
      <nav className="mt-6">
        <Link to="/admin" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
          <Home className="mr-3" size={20} />
          Dashboard
        </Link>
        <Link to="/admin/add-product" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
          <Package className="mr-3" size={20} />
          Add Product
        </Link>
        <Link to="/admin/settings" className="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100">
          <Settings className="mr-3" size={20} />
          Settings
        </Link>
      </nav>
    </div>
  )
}
import { useState } from 'react';
import { BellIcon, UserCircleIcon, ChartBarIcon, CubeIcon, LogoutIcon } from '@heroicons/react/outline';

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [notifications, setNotifications] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const handleAddItem = (e) => {
    e.preventDefault();
    const item = {
      id: Date.now(),
      name: newItem.name,
      quantity: parseInt(newItem.quantity),
    };
    setItems([...items, item]);
    setNewItem({ name: '', quantity: '' });
  };

  const handleSellItem = (id) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = item.quantity - 1;
        // Check quantity thresholds
        if (newQuantity <= item.quantity * 0.05) {
          setNotifications([
            ...notifications,
            `${item.name}: quantity nearing zero!`
          ]);
        } else if (newQuantity <= item.quantity * 0.25) {
          setNotifications([
            ...notifications,
            `${item.name}: quantity less than a quarter!`
          ]);
        }
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-purple-700 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4">
          <h2 className={`${isSidebarOpen ? 'text-xl' : 'hidden'} font-bold`}>Inventory System</h2>
        </div>
        <nav className="mt-8">
          <a href="#" className="flex items-center px-4 py-3 text-white hover:bg-purple-600">
            <ChartBarIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-3">Dashboard</span>}
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-white hover:bg-purple-600">
            <CubeIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-3">Inventory</span>}
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-gray-500 hover:text-gray-600">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <BellIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-8 w-8 text-gray-500" />
                <span className="text-gray-700">Admin User</span>
              </div>
              <LogoutIcon className="h-6 w-6 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Notifications */}
          {notifications.length > 0 && (
            <div className="mb-6">
              {notifications.map((notification, index) => (
                <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-2 rounded-r-lg shadow-sm">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <BellIcon className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">{notification}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <CubeIcon className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Items</p>
                  <h3 className="text-2xl font-semibold text-gray-700">{items.length}</h3>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <ChartBarIcon className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Quantity</p>
                  <h3 className="text-2xl font-semibold text-gray-700">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </h3>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <BellIcon className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Alerts</p>
                  <h3 className="text-2xl font-semibold text-gray-700">{notifications.length}</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Add Item Form */}
          <div className="bg-white rounded-lg shadow-sm mb-6">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Add New Item</h2>
              <form onSubmit={handleAddItem} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Quantity"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                    required
                    min="1"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Add Item
                </button>
              </form>
            </div>
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">Inventory Items</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            item.quantity > item.quantity * 0.25
                              ? 'bg-green-100 text-green-800'
                              : item.quantity > item.quantity * 0.05
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {item.quantity > item.quantity * 0.25
                              ? 'In Stock'
                              : item.quantity > item.quantity * 0.05
                              ? 'Low Stock'
                              : 'Critical Stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleSellItem(item.id)}
                            className="text-purple-600 hover:text-purple-900 font-medium"
                          >
                            Sell
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 
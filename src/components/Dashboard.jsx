import { useState, useEffect } from 'react';
import { BellIcon, UserCircleIcon, ChartBarIcon, CubeIcon, LogoutIcon } from '@heroicons/react/outline';
import { addItemAction, getAllItemsAction, sellItemAction, getLowStock,getItemsSold } from '../store/item/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { notification } from 'antd'
import { Notifications } from './model/notification';
const Dashboard = () => {
  const itemsState = useSelector((state) => state.items.all)
  const itemsSold = useSelector((state)=>state.items?.itemsSold?.total_sold)
  console.log("items",itemsSold)
  const user = useSelector((state) => state.auth.user)
  const notificationData = useSelector((state) => state.items.notifications)
 
  const dispatch = useDispatch()
  const [items, setItems] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null);
  const [newItem, setNewItem] = useState({ name: '', quantity: '' });
  const [notifications, setNotifications] = useState([]);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  const toggleModal = () => {
    console.log("opeennn")
    setIsModalOpen(!isModalOpen);
  };

  const handleAddItem = async (e) => {
    console.log("item new====", newItem)
    console.log("items====", items)
    e.preventDefault();
    const isAdded = await addItemAction(newItem)(dispatch)
    if (isAdded) {
      notification.success({ message: "device Added successfully" })
      getAllItemsAction()(dispatch);
    }
    // const item = {
    //   id: Date.now(),
    //   name: newItem.name,
    //   quantity: parseInt(newItem.quantity),
    // };
    setItems([...items]);
    // setNewItem({ name: '', quantity: '' });
  }

  useEffect(() => {
    const fetchItems = async () => {
      const success = await getItemsSold()(dispatch);
      if (!success) {
        console.error('Failed to fetch items.');
      }
    };
    fetchItems();
  }, [dispatch]);

  useEffect(() => {
    const fetchItems = async () => {
      const success = await getAllItemsAction()(dispatch);
      if (!success) {
        console.error('Failed to fetch items.');
      }
    };
    fetchItems();
  }, [dispatch]);
  useEffect(() => {
    const fetchItems = async () => {
      const success = await getLowStock()(dispatch);
      if (!success) {
        console.error("Failed to fetch low stock.");
      }
    };


    const interval = setInterval(() => {
      fetchItems();
    }, 2000);


    return () => clearInterval(interval);
  }, [dispatch]);

  // const handleChange = (e) =>{
  // const {name,value} = e.target
  // setNewItem((prev)=>({
  //   ...prev,
  // [name]:value
  // }))
  // }
  // const handleSellItem = (id) => {
  //   setItems(items.map(item => {
  //     if (item.id === id) {
  //       const newQuantity = item.quantity - 1;
  //       // Check quantity thresholds
  //       if (newQuantity <= item.quantity * 0.05) {
  //         setNotifications([
  //           ...notifications,
  //           `${item.name}: quantity nearing zero!`
  //         ]);
  //       } else if (newQuantity <= item.quantity * 0.25) {
  //         setNotifications([
  //           ...notifications,
  //           `${item.name}: quantity less than a quarter!`
  //         ]);
  //       }
  //       return { ...item, quantity: newQuantity };
  //     }
  //     return item;
  //   }));
  // };

  const handleSellItem = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  const handleSellSubmit = async (e) => {
    e.preventDefault();
    const quantityToSell = e.target.quantity.value
    console.log("selected item", selectedItem)
    // console.log("checkkk",{name:selectedItem.id, quantity:quantityToSell})
    const isSold = await sellItemAction({ name: selectedItem.name, quantity: quantityToSell })(dispatch)
    if (isSold) {
      notification.success({ message: `Device Sold successfully  ${isSold.response.notification || ""}  ` })
      getAllItemsAction()(dispatch);
    }

    // Call the sell request function
    // handleSellRequest(selectedItem.id, quantityToSell);

    // Close the popup and reset selected item
    setIsPopupOpen(false);
    setSelectedItem(null);
  };

  const handleLogOut = () => {
    localStorage.clear()
    navigate("/login")
  }
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-purple-700 text-white transition-all duration-300 ease-in-out`}>
        <div className="p-4">
          <h2 className={`${isSidebarOpen ? 'text-xl' : 'hidden'} font-bold`}>Inventory System</h2>
        </div>
        {/* <nav className="mt-8">
          <a href="#" className="flex items-center px-4 py-3 text-white hover:bg-purple-600">
            <ChartBarIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-3">Dashboard</span>}
          </a>
          5<a href="#" className="flex items-center px-4 py-3 text-white hover:bg-purple-600">
            <CubeIcon className="h-6 w-6" />
            {isSidebarOpen && <span className="ml-3">Inventory</span>}
          </a>
        </nav> */}
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
                <div
                  className="p-3 rounded-full bg-green-100 text-green-600 cursor-pointer"
                  onClick={toggleModal}
                >
                  <div className='relative'>
                    <BellIcon className="h-8 w-8" />
                    <div className='absolute -top-2 -right-4 border h-5 w-5 text-xs rounded-full text-center bg-red-500 text-white'>
                      {notificationData?.length}
                    </div>
                  </div>

                </div>
                {isModalOpen && (
                  <Notifications toggleModal={toggleModal} />
                )}

              </div>
              <div className="flex items-center space-x-2">
                <UserCircleIcon className="h-8 w-8 text-gray-500" />
                <span className="text-gray-700">{user.username}</span>
              </div>
              <LogoutIcon onClick={handleLogOut} className="h-6 w-6 text-gray-500 cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
          {/* Notifications */}

          {/* {notifications.length > 0 && (
            <div className="mb-6">
              {notifications.map((notification, index) => (
                <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-2 rounded-r-lg shadow-sm">
                  <div className="flex">
                    <div  className="flex-shrink-0">
                      <BellIcon onClick={toggleModal} className="h-5 w-5 text-yellow-400" />
                    </div>
                    {isModalOpen && (
        <div
          className="absolute top-0 right-0 z-50 bg-white shadow-lg rounded-lg w-72 p-4"
          style={{ transform: "translate(-50%, 0)" }}
        >
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Notifications</h3>
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={toggleModal}
            >
              ×
            </button>
          </div>
          <ul className="mt-4">
            <li className="py-2 border-b border-gray-200">
              <p className="text-sm text-gray-600">You have a new message!</p>
            </li>
            <li className="py-2">
              <p className="text-sm text-gray-600">Your profile has been updated.</p>
            </li>
          </ul>
        </div>
      )}
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">{notification}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )} */}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <CubeIcon className="h-8 w-8" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-500">Total  Items Sold   </p>
                  <h3 className="text-2xl font-semibold text-gray-700">{itemsSold}</h3>
                </div>
              </div>
            </div>
            {/* <div className="bg-white rounded-lg shadow-sm p-6"> */}
              {/* <div className="flex items-center"> */}
                {/* <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  {/* <ChartBarIcon className="h-8 w-8" /> */}
                {/* </div>  */}
                {/* <div className="ml-4">
                  <p className="text-sm text-gray-500">Total Quantity</p>
                  <h3 className="text-2xl font-semibold text-gray-700">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </h3>
                </div> */}
              {/* </div> */}
            {/* </div> */}
          
          </div>

          {/* Add Item Form */}
          {user.role === "admin" && <div className="bg-white rounded-lg shadow-sm mb-6">
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
          </div>}

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
                      {user.role === "stock_officer" && <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {itemsState?.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.quantity > item.quantity * 0.25
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
                        {user.role === "stock_officer" && <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button
                            onClick={() => handleSellItem(item)}
                            className="text-purple-600 hover:text-purple-900 font-medium"
                          >
                            Sell
                          </button>
                        </td>}
                      </tr>
                    ))}
                  </tbody>
                </table>
                {isPopupOpen && selectedItem && (
                  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">
                        Sell Item: {selectedItem.name}
                      </h3>
                      <form onSubmit={handleSellSubmit}>
                        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                          Quantity to Sell:
                        </label>
                        <input
                          id="quantity"
                          name="quantity"
                          type="number"
                          min="1"
                          required
                          className="block w-full mt-1 border-gray-300 border rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        />
                        <div className="flex justify-end mt-4">
                          <button
                            type="button"
                            onClick={() => setIsPopupOpen(false)}
                            className="text-gray-600 hover:text-gray-800 mr-4"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard; 
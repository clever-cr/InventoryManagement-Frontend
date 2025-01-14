import { useSelector } from "react-redux"

export const Notifications = ({toggleModal}) => {
    const notifications = useSelector((state) => state.items.notifications)
    return (<div
        className="absolute top-12 right-0 z-50 bg-white shadow-lg rounded-lg w-72 p-4"
        style={{ transform: "translate(-50%, 0)" }}
    >
        <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Low stock alert</h3>
            <button
                className="text-gray-500 hover:text-gray-700"
                onClick={toggleModal}
            >
                ×
            </button>
        </div>
        <ul className="mt-4">
           {notifications?.map((notification)=>
           <li className="py-2 border-b border-gray-200 flex gap-5">
           
           <p className="text-sm text-gray-600">{notification.name}</p>
           <p className="text-sm text-gray-600">{notification.quantity}</p>
       </li>
           ) }
            
        </ul>
    </div>)
}
import React, { useState } from 'react';

function OrderCard({ orderId, order, onCancel, onSuccess }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="border rounded-xl shadow-md p-4 mb-4 bg-white w-3/5 mx-auto">
            {/* Top section: order ID and customer name */}
            <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <h2 className="text-lg font-semibold">
                #{orderId} - {order.customer.firstName + ' ' + order.customer.lastName}
                </h2>
                <span className="text-gray-600">
                {expanded ? '▲' : '▼'}
                </span>
            </div>

            {/* Expandable: items list */}
            {expanded && (
                <div className="mt-4 border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">Time: {order.date}</p>
                <div className="space-y-2">
                    {order.items.map((item, index) => (
                        <div
                        key={`${item.id}-${JSON.stringify(item.customizations)}`}
                        className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-4 mb-4 border rounded-lg"
                        >
                            <img
                            src={item.image}
                            alt={item.type}
                            className="rounded-full w-24 h-24 object-cover"
                            />
            
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
                            </div>
            
                            <div className="text-right">
                                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>  
                            </div>
                        </div>
                    ))}
                </div>
                </div>
            )}

            {/* Bottom: price + buttons */}
            <div className="flex justify-between items-center mt-4 pt-4 border-t">
                <span className="font-bold text-lg">Total: ${order.totalAmount.toFixed(2)}</span>
                <div className="space-x-2">
                    <button
                        onClick={() => onCancel(order)}
                        className="cursor-pointer inline-block border border-black rounded-full px-4 py-2 leading-tight text-center no-underline text-black hover:bg-black/5"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSuccess(order)}
                        className="cursor-pointer inline-block border border-black rounded-full px-4 py-2 leading-tight text-center no-underline bg-black text-white hover:bg-gray-800inline-block px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition"
                    >
                        Success
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderCard;
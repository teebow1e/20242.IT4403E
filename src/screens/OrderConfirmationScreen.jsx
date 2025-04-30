import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

function OrderConfirmationScreen() {
  const location = useLocation();
  const { orderId, orderDetails } = location.state || {};

  // If no order details are passed, redirect to home
  if (!orderId || !orderDetails) {
    return <Navigate to="/" replace />;
  }

  const formatDate = () => {
    const now = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    };
    return now.toLocaleDateString('en-US', options);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="bg-white shadow-md rounded-lg p-8">
        <div className="text-center mb-8">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-green-700 mb-2">Thank You for Your Order!</h1>
          <p className="text-gray-600">Your order has been placed successfully.</p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center border-b pb-4 mb-4">
            <h2 className="text-xl font-bold">Order Details</h2>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
              Confirmed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-500 text-sm">Order ID</p>
              <p className="font-medium">{orderId}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Date</p>
              <p className="font-medium">{formatDate()}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="font-medium">
                {orderDetails.customer.firstName} {orderDetails.customer.lastName}
              </p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="font-medium">{orderDetails.customer.email}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-bold mb-4">Items</h3>

            <div className="space-y-3 mb-6">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <div>
                    <p className="font-medium">{item.type}</p>
                    <p className="text-sm text-gray-500">
                      {Object.keys(item.customizations || {}).length > 0
                        ? Object.entries(item.customizations).map(([key, value]) => `${key}: ${value}`).join(', ')
                        : 'No customizations'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Qty: {item.quantity} × ${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Subtotal</span>
                <span>${(orderDetails.totalAmount / 1.0725).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Tax (7.25%)</span>
                <span>${(orderDetails.totalAmount - (orderDetails.totalAmount / 1.0725)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-2">
                <span>Total</span>
                <span>${orderDetails.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <p className="text-gray-600">
            We've sent a confirmation email to {orderDetails.customer.email} with all the details of your order.
          </p>

          <div className="space-x-4">
            <Link
              to="/menu"
              className="inline-block px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmationScreen;

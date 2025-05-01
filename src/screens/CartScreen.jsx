import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotalAmount,
  removeFromCart,
  decreaseQuantity,
  addToCart,
  clearCart
} from '../features/CartSlice';

function CartScreen() {
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectCartTotalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseQuantity(item));
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addToCart({
      id: item.id,
      type: item.type,
      image: item.image,
      price: item.price,
      category: item.category,
      customizations: item.customizations
    }));
  };

  const handleCheckout = () => {
    // In a real application, this would navigate to a checkout page
    // For now, we'll just show an alert and clear the cart
    alert('Your order has been placed successfully!');
    dispatch(clearCart());
    navigate('/menu');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-6">Your cart is empty</p>
          <Link
            to="/menu"
            className="inline-block px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            {cartItems.map((item) => (
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
                  <h3 className="text-lg font-semibold">{item.type}</h3>
                  <p className="text-gray-600 mb-2">${item.price.toFixed(2)} each</p>

                  {Object.keys(item.customizations).length > 0 && (
                    <div className="text-sm text-gray-500 mb-2">
                      {Object.entries(item.customizations).map(([key, value]) => (
                        <p key={key}>{key}: {value}</p>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      className="w-8 h-8 rounded-full border border-green-700 flex items-center justify-center text-green-700 hover:bg-green-700 hover:text-white"
                    >
                      -
                    </button>
                    <span className="mx-3">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className="w-8 h-8 rounded-full border border-green-700 flex items-center justify-center text-green-700 hover:bg-green-700 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold">${item.totalPrice.toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveItem(item)}
                    className="text-red-600 hover:text-red-800 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-4">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>${(totalAmount * 0.0725).toFixed(2)}</span>
              </div>

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${(totalAmount * 1.0725).toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 px-6 py-3 bg-green-700 text-white rounded-full hover:bg-green-800 transition"
              >
                Checkout
              </button>

              <Link
                to="/menu"
                className="w-full block text-center mt-4 text-green-700 hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartScreen;

import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartTotalQuantity } from '../features/CartSlice';

function CartIcon() {
  const totalQuantity = useSelector(selectCartTotalQuantity);

  return (
    <Link to="/cart" className="relative flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {totalQuantity > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
          {totalQuantity}
        </span>
      )}
    </Link>
  );
}

export default CartIcon;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/CartSlice';

function AddToCartButton({ item, category }) {
  const dispatch = useDispatch();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    // Generate a unique ID using the type and a timestamp
    const id = `${item.type.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;

    dispatch(addToCart({
      id,
      type: item.type,
      image: item.image,
      price: 4.95, // Default price - this would normally come from the item data
      category,
      customizations: {} // No customizations by default
    }));

    // Show feedback
    setIsAdding(true);
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`mt-2 px-4 py-1 rounded-full transition-all duration-300 ${
        isAdding
          ? 'bg-green-700 text-white'
          : 'border border-green-700 text-green-700 hover:bg-green-700 hover:text-white'
      }`}
    >
      {isAdding ? 'Added!' : 'Add to Cart'}
    </button>
  );
}

export default AddToCartButton;

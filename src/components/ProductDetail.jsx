import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/CartSlice';
import FormSubmit from '../forms/FormSubmit';

// This component can be used in a modal or as a separate page
function ProductDetail({ item, category, onClose }) {
  const dispatch = useDispatch();
  const [customizations, setCustomizations] = useState({
    size: 'Grande',
    milk: 'Whole Milk',
    shots: 2,
    toppings: []
  });
  const [isAdded, setIsAdded] = useState(false);

  const sizes = {
    'Short': -0.50,
    'Tall': -0.25,
    'Grande': 0,
    'Venti': 0.50,
    'Trenta': 1.00
  };

  const milkOptions = [
    'Whole Milk',
    '2% Milk',
    'Nonfat Milk',
    'Almond Milk',
    'Coconut Milk',
    'Oat Milk',
    'Soy Milk'
  ];

  const toppingOptions = [
    'Whipped Cream',
    'Caramel Drizzle',
    'Chocolate Drizzle',
    'Cinnamon Powder',
    'Vanilla Powder',
    'Nutmeg'
  ];

  const handleSizeChange = (size) => {
    setCustomizations({
      ...customizations,
      size
    });
  };

  const handleMilkChange = (e) => {
    setCustomizations({
      ...customizations,
      milk: e.target.value
    });
  };

  const handleShotChange = (shots) => {
    setCustomizations({
      ...customizations,
      shots
    });
  };

  const handleToppingToggle = (topping) => {
    const updatedToppings = [...customizations.toppings];
    if (updatedToppings.includes(topping)) {
      const index = updatedToppings.indexOf(topping);
      updatedToppings.splice(index, 1);
    } else {
      updatedToppings.push(topping);
    }

    setCustomizations({
      ...customizations,
      toppings: updatedToppings
    });
  };

  const calculatePrice = () => {
    // Base price
    let price = 4.95;

    // Add size adjustment
    price += sizes[customizations.size] || 0;

    // Add $0.80 for each extra shot beyond the first 2
    if (customizations.shots > 2) {
      price += (customizations.shots - 2) * 0.80;
    }

    // Add $0.70 for non-standard milks (except 2% and nonfat)
    if (!['Whole Milk', '2% Milk', 'Nonfat Milk'].includes(customizations.milk)) {
      price += 0.70;
    }

    // Add $0.50 for each topping
    price += customizations.toppings.length * 0.50;

    return price.toFixed(2);
  };

  const handleAddToCart = () => {
    // Clean up the customizations object to only include selected options
    const selectedCustomizations = {};

    selectedCustomizations.size = customizations.size;

    if (customizations.milk !== 'Whole Milk') {
      selectedCustomizations.milk = customizations.milk;
    }

    if (customizations.shots !== 2) {
      selectedCustomizations.shots = customizations.shots;
    }

    if (customizations.toppings.length > 0) {
      selectedCustomizations.toppings = customizations.toppings;
    }

    // Generate a unique ID
    const id = `${item.type.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`;

    dispatch(addToCart({
      id,
      type: item.type,
      image: item.image,
      price: parseFloat(calculatePrice()),
      category,
      customizations: selectedCustomizations
    }));

    // Show added confirmation
    setIsAdded(true);

    // Reset after 1.5 seconds
    setTimeout(() => {
      setIsAdded(false);
      if (onClose) onClose();
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-6 flex items-center justify-center bg-gray-50">
          <img
            src={item.image}
            alt={item.type}
            className="w-64 h-64 object-contain rounded-full"
          />
        </div>

        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-bold">{item.type}</h2>
            {onClose && (
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>

          <p className="text-xl font-semibold mt-2">${calculatePrice()}</p>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Customize</h3>

            {/* Size Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Size</h4>
              <div className="flex space-x-2">
                {Object.keys(sizes).map((size) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      customizations.size === size
                        ? 'bg-green-700 text-white'
                        : 'border border-gray-300 hover:border-green-700'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Milk Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Milk</h4>
              <select
                value={customizations.milk}
                onChange={handleMilkChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                {milkOptions.map((milk) => (
                  <option key={milk} value={milk}>
                    {milk}{!['Whole Milk', '2% Milk', 'Nonfat Milk'].includes(milk) && ' (+$0.70)'}
                  </option>
                ))}
              </select>
            </div>

            {/* Shot Selection */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Espresso Shots ({customizations.shots > 2 ? `+$${(customizations.shots - 2) * 0.80}` : 'Included'})</h4>
              <div className="flex items-center">
                <button
                  onClick={() => handleShotChange(Math.max(1, customizations.shots - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-l-md hover:bg-gray-300"
                >
                  -
                </button>
                <span className="px-4 py-1 border-t border-b">{customizations.shots}</span>
                <button
                  onClick={() => handleShotChange(customizations.shots + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-r-md hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {/* Toppings */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-2">Toppings (+ $0.50 each)</h4>
              <div className="grid grid-cols-2 gap-2">
                {toppingOptions.map((topping) => (
                  <label key={topping} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={customizations.toppings.includes(topping)}
                      onChange={() => handleToppingToggle(topping)}
                      className="mr-2"
                    />
                    {topping}
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-3 rounded-full font-bold transition-all ${
                isAdded
                  ? 'bg-green-700 text-white'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isAdded ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/CartSlice';

function ProductDetail({ item, category, onClose }) {
  const dispatch = useDispatch();
  const [customizations, setCustomizations] = useState({
    size: 'Grande',
    milk: 'Whole Milk',
    shots: 2,
    toppings: []
  });
  const [isAdded, setIsAdded] = useState(false);

  // For smooth transitions
  const [activeTab, setActiveTab] = useState('size');

  const sizes = {
    'Short': { price: -0.50, oz: '8 fl oz' },
    'Tall': { price: -0.25, oz: '12 fl oz' },
    'Grande': { price: 0, oz: '16 fl oz' },
    'Venti': { price: 0.50, oz: '20 fl oz' },
    'Trenta': { price: 1.00, oz: '30 fl oz' }
  };

  const milkOptions = [
    { name: 'Whole Milk', price: 0 },
    { name: '2% Milk', price: 0 },
    { name: 'Nonfat Milk', price: 0 },
    { name: 'Almond Milk', price: 0.70 },
    { name: 'Coconut Milk', price: 0.70 },
    { name: 'Oat Milk', price: 0.70 },
    { name: 'Soy Milk', price: 0.70 }
  ];

  const toppingOptions = [
    { name: 'Whipped Cream', price: 0.50 },
    { name: 'Caramel Drizzle', price: 0.50 },
    { name: 'Chocolate Drizzle', price: 0.50 },
    { name: 'Cinnamon Powder', price: 0.50 },
    { name: 'Vanilla Powder', price: 0.50 },
    { name: 'Nutmeg', price: 0.50 }
  ];

  const handleSizeChange = (size) => {
    setCustomizations({
      ...customizations,
      size
    });
  };

  const handleMilkChange = (milk) => {
    setCustomizations({
      ...customizations,
      milk
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
    price += sizes[customizations.size]?.price || 0;

    // Add for each extra shot beyond the first 2
    if (customizations.shots > 2) {
      price += (customizations.shots - 2) * 0.80;
    }

    // Add for non-standard milks
    const selectedMilk = milkOptions.find(m => m.name === customizations.milk);
    if (selectedMilk) {
      price += selectedMilk.price;
    }

    // Add for each topping
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
    <div className="bg-white rounded-lg overflow-hidden max-w-4xl mx-auto">
      <div className="relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="md:w-1/3 bg-gray-50 p-8 flex items-center justify-center">
          <div className="relative rounded-full overflow-hidden">
            <img
              src={item.image}
              alt={item.type}
              className="w-64 h-64 object-cover"
            />
          </div>
        </div>

        {/* Product Details and Customization */}
        <div className="md:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-gray-800">{item.type}</h2>
          <p className="text-xl font-semibold text-gray-700 mt-2">${calculatePrice()}</p>

          {/* Customization Tabs */}
          <div className="mt-8">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'size' ? 'text-starbucks-green border-b-2 border-starbucks-green' : 'text-gray-500'}`}
                onClick={() => setActiveTab('size')}
              >
                Size
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'milk' ? 'text-starbucks-green border-b-2 border-starbucks-green' : 'text-gray-500'}`}
                onClick={() => setActiveTab('milk')}
              >
                Milk
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'shots' ? 'text-starbucks-green border-b-2 border-starbucks-green' : 'text-gray-500'}`}
                onClick={() => setActiveTab('shots')}
              >
                Shots
              </button>
              <button
                className={`py-2 px-4 font-medium ${activeTab === 'toppings' ? 'text-starbucks-green border-b-2 border-starbucks-green' : 'text-gray-500'}`}
                onClick={() => setActiveTab('toppings')}
              >
                Toppings
              </button>
            </div>

            {/* Size Selection */}
            <div className={activeTab === 'size' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.entries(sizes).map(([size, { oz }]) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`py-3 px-2 flex flex-col items-center justify-center rounded-lg transition-colors ${
                      customizations.size === size
                        ? 'bg-starbucks-green bg-opacity-10 text-starbucks-green border border-starbucks-green'
                        : 'border border-gray-300 hover:border-starbucks-green'
                    }`}
                  >
                    <span className="text-sm font-semibold">{size}</span>
                    <span className="text-xs text-gray-500">{oz}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Milk Selection */}
            <div className={activeTab === 'milk' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {milkOptions.map(({ name, price }) => (
                  <button
                    key={name}
                    onClick={() => handleMilkChange(name)}
                    className={`py-3 px-4 flex justify-between items-center rounded-lg transition-colors ${
                      customizations.milk === name
                        ? 'bg-starbucks-green bg-opacity-10 text-starbucks-green border border-starbucks-green'
                        : 'border border-gray-300 hover:border-starbucks-green'
                    }`}
                  >
                    <span className="text-sm font-medium">{name}</span>
                    {price > 0 && <span className="text-xs text-gray-500">+${price.toFixed(2)}</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Shot Selection */}
            <div className={activeTab === 'shots' ? 'block' : 'hidden'}>
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-4">
                <div>
                  <p className="font-medium">Espresso Shots</p>
                  <p className="text-sm text-gray-500">
                    {customizations.shots > 2 ? `+$${((customizations.shots - 2) * 0.80).toFixed(2)}` : 'Included'}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleShotChange(Math.max(1, customizations.shots - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-starbucks-green hover:text-starbucks-green transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="mx-4 font-semibold">{customizations.shots}</span>
                  <button
                    onClick={() => handleShotChange(customizations.shots + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-starbucks-green hover:text-starbucks-green transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Toppings */}
            <div className={activeTab === 'toppings' ? 'block' : 'hidden'}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {toppingOptions.map(({ name, price }) => (
                  <button
                    key={name}
                    onClick={() => handleToppingToggle(name)}
                    className={`py-3 px-4 flex justify-between items-center rounded-lg transition-colors ${
                      customizations.toppings.includes(name)
                        ? 'bg-starbucks-green bg-opacity-10 text-starbucks-green border border-starbucks-green'
                        : 'border border-gray-300 hover:border-starbucks-green'
                    }`}
                  >
                    <span className="text-sm font-medium">{name}</span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">+${price.toFixed(2)}</span>
                      {customizations.toppings.includes(name) && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-starbucks-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="mt-8">
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-3 px-6 rounded-full font-bold text-white transition-all ${
                isAdded
                  ? 'bg-green-600'
                  : 'bg-starbucks-green hover:bg-starbucks-green-dark'
              }`}
            >
              {isAdded ? (
                <div className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Added to Cart
                </div>
              ) : (
                `Add to Cart · $${calculatePrice()}`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

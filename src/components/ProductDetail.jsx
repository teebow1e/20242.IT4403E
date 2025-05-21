import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/CartSlice';

function ProductDetail({ item, category, onClose }) {
  const dispatch = useDispatch();
  const [customizations, setCustomizations] = useState({
    size: 'Grande',
    milk: 'Whole Milk',
    shots: 2,
    toppings: [],
  });
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('size');

  const sizes = {
    Short: { price: -0.5, oz: '8 fl oz' },
    Tall: { price: -0.25, oz: '12 fl oz' },
    Grande: { price: 0, oz: '16 fl oz' },
    Venti: { price: 0.5, oz: '20 fl oz' },
    Trenta: { price: 1.0, oz: '30 fl oz' },
  };

  const milkOptions = [
    { name: 'Whole Milk', price: 0 },
    { name: '2% Milk', price: 0 },
    { name: 'Nonfat Milk', price: 0 },
    { name: 'Almond Milk', price: 0.7 },
    { name: 'Coconut Milk', price: 0.7 },
    { name: 'Oat Milk', price: 0.7 },
    { name: 'Soy Milk', price: 0.7 },
  ];

  const toppingOptions = [
    { name: 'Whipped Cream', price: 0.5 },
    { name: 'Caramel Drizzle', price: 0.5 },
    { name: 'Chocolate Drizzle', price: 0.5 },
    { name: 'Cinnamon Powder', price: 0.5 },
    { name: 'Vanilla Powder', price: 0.5 },
    { name: 'Nutmeg', price: 0.5 },
  ];

  const handleSizeChange = (size) => setCustomizations({ ...customizations, size });
  const handleMilkChange = (milk) => setCustomizations({ ...customizations, milk });
  const handleShotChange = (shots) => setCustomizations({ ...customizations, shots });

  const handleToppingToggle = (topping) => {
    const updated = customizations.toppings.includes(topping)
      ? customizations.toppings.filter((t) => t !== topping)
      : [...customizations.toppings, topping];
    setCustomizations({ ...customizations, toppings: updated });
  };

  const calculatePrice = () => {
    price += sizes[customizations.size]?.price || 0;
    if (customizations.shots > 2) price += (customizations.shots - 2) * 0.8;
    price += milkOptions.find((m) => m.name === customizations.milk)?.price || 0;
    price += customizations.toppings.length * 0.5;
    return price.toFixed(2);
  };

  const handleAddToCart = () => {
    const selected = { size: customizations.size };
    if (customizations.milk !== 'Whole Milk') selected.milk = customizations.milk;
    if (customizations.shots !== 2) selected.shots = customizations.shots;
    if (customizations.toppings.length) selected.toppings = customizations.toppings;

    dispatch(
      addToCart({
        id: `${item.type.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}`,
        type: item.type,
        image: item.image,
        price: parseFloat(calculatePrice()),
        category,
        customizations: selected,
      }),
    );

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose?.();
    }, 1500);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden max-w-4xl mx-auto">
      {/* close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="flex flex-col md:flex-row">
        {/* image */}
        <div className="md:w-1/3 bg-gray-50 p-8 flex items-center justify-center">
          <img src={item.image} alt={item.type} className="w-64 h-64 object-cover rounded-full" />
        </div>

        {/* details */}
        <div className="md:w-2/3 p-8">
          <h2 className="text-2xl font-bold text-gray-800">{item.type}</h2>
          <p className="text-xl font-semibold text-gray-700 mt-2">${calculatePrice()}</p>

          {/* tabs */}
          <div className="mt-8">
            <div className="flex border-b border-gray-200 mb-6">
              {['size', 'milk', 'shots', 'toppings'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-2 px-4 font-medium ${
                    activeTab === tab
                      ? 'text-[#006241] border-b-2 border-[#006241]'
                      : 'text-gray-500'
                  }`}
                >
                  {tab[0].toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Size */}
            {activeTab === 'size' && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {Object.entries(sizes).map(([size, { oz }]) => (
                  <button
                    key={size}
                    onClick={() => handleSizeChange(size)}
                    className={`py-3 px-2 flex flex-col items-center rounded-lg transition-colors ${
                      customizations.size === size
                        ? 'bg-[#006241]/10 text-[#006241] border border-[#006241]'
                        : 'border border-gray-300 hover:border-[#006241]'
                    }`}
                  >
                    <span className="text-sm font-semibold">{size}</span>
                    <span className="text-xs text-gray-500">{oz}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Milk */}
            {activeTab === 'milk' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {milkOptions.map(({ name, price }) => (
                  <button
                    key={name}
                    onClick={() => handleMilkChange(name)}
                    className={`py-3 px-4 flex justify-between items-center rounded-lg transition-colors ${
                      customizations.milk === name
                        ? 'bg-[#006241]/10 text-[#006241] border border-[#006241]'
                        : 'border border-gray-300 hover:border-[#006241]'
                    }`}
                  >
                    <span className="text-sm font-medium">{name}</span>
                    {price > 0 && <span className="text-xs text-gray-500">+${price.toFixed(2)}</span>}
                  </button>
                ))}
              </div>
            )}

            {/* Shots */}
            {activeTab === 'shots' && (
              <div className="flex items-center justify-between border border-gray-300 rounded-lg p-4">
                <div>
                  <p className="font-medium">Espresso Shots</p>
                  <p className="text-sm text-gray-500">
                    {customizations.shots > 2 ? `+$${((customizations.shots - 2) * 0.8).toFixed(2)}` : 'Included'}
                  </p>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => handleShotChange(Math.max(1, customizations.shots - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#006241] hover:text-[#006241] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="mx-4 font-semibold">{customizations.shots}</span>
                  <button
                    onClick={() => handleShotChange(customizations.shots + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 hover:border-[#006241] hover:text-[#006241] transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Toppings */}
            {activeTab === 'toppings' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {toppingOptions.map(({ name, price }) => (
                  <button
                    key={name}
                    onClick={() => handleToppingToggle(name)}
                    className={`py-3 px-4 flex justify-between items-center rounded-lg transition-colors ${
                      customizations.toppings.includes(name)
                        ? 'bg-[#006241]/10 text-[#006241] border border-[#006241]'
                        : 'border border-gray-300 hover:border-[#006241]'
                    }`}
                  >
                    <span className="text-sm font-medium">{name}</span>
                    <div className="flex items-center">
                      <span className="text-xs text-gray-500 mr-2">+${price.toFixed(2)}</span>
                      {customizations.toppings.includes(name) && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#006241]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isAdded}
            className={`mt-8 w-full py-3 px-6 rounded-full font-bold text-white transition-all ${
              isAdded ? 'bg-green-600' : 'bg-[#006241] hover:bg-[#1e3932]'
            }`}
          >
            {isAdded ? (
              <span className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Added to Cart
              </span>
            ) : (
              `Add to Cart · $${calculatePrice()}`
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

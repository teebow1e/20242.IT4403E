import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import menuList from './menuList.json';

function MenuCategory({ title, items, isExpanded, onToggle }) {
  const location = useLocation();

  return (
    <div className="mb-6">
      <div
        className="flex items-center justify-between cursor-pointer mb-3"
        onClick={onToggle}
      >
        <h4 className="text-base font-bold text-gray-800">{title}</h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col space-y-2.5 pl-1">
          {items.map(({ path, type }, idx) => {
            const isActive = location.pathname === `/menu${path}`;

            return (
              <Link
                key={`${title.toLowerCase()}-${idx}`}
                to={`/menu${path}`}
                className={`text-sm hover:text-[#006241] transition-colors duration-200 ${
                  isActive ? 'text-[#006241] font-semibold' : 'text-gray-600'
                }`}
              >
                {type}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MenuList() {
  const { drinks, food, atHomeCoffee, merchandise } = menuList[0];
  const location = useLocation();

  /* infer current section */
  const currentPath = location.pathname;
  const [expandedCategories, setExpandedCategories] = useState({
    drinks: currentPath.includes('/drinks'),
    food: currentPath.includes('/food'),
    atHomeCoffee: currentPath.includes('/at-home-coffee'),
    merchandise: merchandise && currentPath.includes('/merchandise'),
  });

  const toggleCategory = (cat) =>
    setExpandedCategories({ ...expandedCategories, [cat]: !expandedCategories[cat] });

  return (
    <div className="py-4 pr-8 border-r border-gray-200 min-w-[220px]">
      {/* All products */}
      <div className="mb-8">
        <Link
          to="/menu"
          className={`text-base font-bold ${
            location.pathname === '/menu'
              ? 'text-[#006241]'
              : 'text-gray-800 hover:text-[#006241]'
          } transition-colors duration-200`}
        >
          All products
        </Link>
      </div>

      {/* Featured */}
      <div className="mb-8">
        <Link
          to="/menu/featured"
          className={`text-base font-bold ${
            location.pathname === '/menu/featured'
              ? 'text-[#006241]'
              : 'text-gray-800 hover:text-[#006241]'
          } transition-colors duration-200`}
        >
          Featured
        </Link>
      </div>

      {/* Placeholder sections */}
      <div className="mb-8">
        <span className="text-base font-bold text-gray-400 cursor-not-allowed">
          Previous Orders
        </span>
      </div>
      <div className="mb-8">
        <span className="text-base font-bold text-gray-400 cursor-not-allowed">
          Favorite Products
        </span>
      </div>

      {/* Category list */}
      <div className="border-t border-gray-200 pt-6">
        <MenuCategory
          title="Drinks"
          items={drinks}
          isExpanded={expandedCategories.drinks}
          onToggle={() => toggleCategory('drinks')}
        />

        <MenuCategory
          title="Food"
          items={food}
          isExpanded={expandedCategories.food}
          onToggle={() => toggleCategory('food')}
        />

        <MenuCategory
          title="At Home Coffee"
          items={atHomeCoffee}
          isExpanded={expandedCategories.atHomeCoffee}
          onToggle={() => toggleCategory('atHomeCoffee')}
        />

        {merchandise && (
          <MenuCategory
            title="Merchandise"
            items={merchandise}
            isExpanded={expandedCategories.merchandise}
            onToggle={() => toggleCategory('merchandise')}
          />
        )}
      </div>
    </div>
  );
}

export default MenuList;

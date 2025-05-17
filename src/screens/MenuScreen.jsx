import React from 'react';
import MenuHeader from './menu/MenuHeader';
import MenuList from './menu/MenuList';
import MenuItem from './menu/MenuItem';
import menuList from './menu/menuList.json';

/* ----------  Category grid ---------- */
function CategorySection({ title, items, pathPrefix = '/menu' }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">{title}</h2>

      <div className="border-t border-gray-200 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {items.map(({ path, type, image }, idx) => (
            <MenuItem
              /* build unique key */
              key={`${title.toLowerCase()}-${idx}`}
              path={`${pathPrefix}${path}`}
              type={type}
              image={image}
              category={title.toLowerCase()}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------  Main menu screen ---------- */
function MenuScreen() {
  const { drinks, food, atHomeCoffee, merchandise } = menuList[0];

  return (
    <div className="flex flex-col">
      <MenuHeader />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          {/* sidebar */}
          <aside className="hidden md:block md:w-1/4 lg:w-1/5 xl:w-1/6">
            <MenuList />
          </aside>

          {/* main grid */}
          <main className="md:w-3/4 lg:w-4/5 xl:w-5/6 md:pl-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Menu</h1>

            <CategorySection title="Drinks" items={drinks} />
            <CategorySection title="Food" items={food} />
            <CategorySection title="At Home Coffee" items={atHomeCoffee} />

            {merchandise && (
              <CategorySection title="Merchandise" items={merchandise} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default MenuScreen;

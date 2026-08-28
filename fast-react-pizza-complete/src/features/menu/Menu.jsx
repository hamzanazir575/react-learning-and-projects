import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from '../menu/MenuItem';
import { useMemo, useState } from 'react';

function Menu() {
  const menu = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  const visibleMenu = useMemo(() => {
    const filtered = menu.filter((pizza) =>
      pizza.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (sortOrder === 'price-asc') {
      filtered.sort((a, b) => a.unitPrice - b.unitPrice);
    } else if (sortOrder === 'price-desc') {
      filtered.sort((a, b) => b.unitPrice - a.unitPrice);
    }

    return filtered;
  }, [menu, searchTerm, sortOrder]);

  return (
    <div className="px-4 py-3">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="text"
          placeholder="Search pizza by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input w-full sm:w-72"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="input w-full sm:w-60"
        >
          <option value="default">Default order</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      <ul className="divide-y divide-stone-200 px-2">
        {visibleMenu.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
    // <ul className="divide-y divide-stone-200 px-2">
    //   {menu.map((pizza) => {
    //     return <MenuItem pizza={pizza} key={pizza.id} />;
    //   })}
    // </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

import { useLoaderData } from 'react-router-dom';

import { getMenu } from '../../services/apiRestaurant';
import MenuItem from '../menu/MenuItem';

function Menu() {
  const menu = useLoaderData();
  // console.log(menu);

  return (
    // tailwind class to create a divider between child elements
    <ul className="divide-y divide-stone-200  px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

// It is a convention to have loader function in same component that we need the data
// Then export it into route and get the data from route using a custom hook when component loads [Render as you fetch]
export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;

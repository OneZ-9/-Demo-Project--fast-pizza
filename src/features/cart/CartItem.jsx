import { useSelector } from 'react-redux';
import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';
import UpdateItemQuantity from './UpdateItemQuantity';
import { getCurrentQuantityById } from './cartSlice';

function CartItem({ cartItem }) {
  const { pizzaId, name, quantity, totalPrice } = cartItem;
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="items-center justify-between py-3 sm:flex">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-3 sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <div className="flex items-center justify-between gap-3 sm:gap-6">
          <UpdateItemQuantity id={pizzaId} currentQuantity={currentQuantity} />

          <DeleteItem id={pizzaId} />
        </div>
      </div>
    </li>
  );
}

export default CartItem;

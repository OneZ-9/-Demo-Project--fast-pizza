import { formatCurrency } from '../../utils/helpers';
import DeleteItem from './DeleteItem';

function CartItem({ cartItem }) {
  const { pizzaId, name, quantity, totalPrice } = cartItem;

  return (
    <li className="items-center justify-between py-3 sm:flex">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;

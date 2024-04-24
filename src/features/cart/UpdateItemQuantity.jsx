import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

function UpdateItemQuantity({ id, currentQuantity }) {
  const dispatch = useDispatch();

  function handleDecreaseItem() {
    dispatch(decreaseItemQuantity(id));
  }
  function handleIncreaseItem() {
    dispatch(increaseItemQuantity(id));
  }

  return (
    <div className="flex items-center gap-1.5 md:gap-2">
      <Button type="round" onClick={handleDecreaseItem}>
        -
      </Button>

      <span className="text-sm font-medium">{currentQuantity}</span>

      <Button type="round" onClick={handleIncreaseItem}>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;

// Test ID: IIDSAT
import { useFetcher, useLoaderData } from 'react-router-dom';

import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import UpdateOrder from './UpdateOrder';

function Order() {
  const order = useLoaderData();

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  // console.log(order);
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  const fetcher = useFetcher();

  // to use this fetcher after component MouseEvent, we use useEffect hook
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
      // load the data and store it in fetcher object
    },
    [fetcher],
  );

  // console.log(fetcher.data);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-400 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t">
        {cart.map((cartItem) => (
          <OrderItem
            cartItem={cartItem}
            key={cartItem.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === cartItem.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 rounded-md bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

// we cannot use useParam hook to get the order id from the link as it will work inside the component
// However to tackle this situation, and passes some data to the loader function as we calls it, one of the properties of the object that loader function recieves is params
// Here we destructure that object to get the params
export async function loader({ params }) {
  // orderId is the name we gave for the param in the router link
  const order = await getOrder(params.orderId);

  return order;
}

export default Order;

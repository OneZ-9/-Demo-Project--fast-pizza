import { useFetcher } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    // Normal router form will navigate from the page with submit
    // fetcher.Form will not navigate away, submit the form and revalidate
    // revalidation means react-router will know the data has chnaged as a result of action and refetch and rerender the page in background
    // we can use fetcher.Forms to update some data without causing navigation
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  //   console.log('update');
  const data = { priority: true };

  await updateOrder(params.orderId, data);

  return null;
}

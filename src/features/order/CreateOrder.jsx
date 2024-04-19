import { useState } from "react";
import { Form, redirect } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;

  return (
    <div>
      <h2>Ready to order? Let's go!</h2>
      {/* Form imported from React-router-dom (for react-router-actions) */}
      {/* POST, PATCH or DELETE methods will work */}
      {/* with action we can write the path where this form submited to, but it not
      necessary as react-router will match closest route by default */}

      {/* <Form method="POST" action="/order/new">   */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button>Order now</button>
        </div>
      </Form>
    </div>
  );
}

// similar to loader function
// whenever the Form submitted, behind the scenes this action function will be called by react-router and pass the request that was submitted.
// request.formData() will provide by browser, it is regular web api
export async function action({ request }) {
  const formData = await request.formData();

  // convert formData into object
  const data = Object.fromEntries(formData);
  // console.log(data);

  // reshape the some of data values that we wanted to be
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  // console.log(order);

  const newOrder = await createOrder(order);

  // here we cannot use useNavigate hooks as hooks only accessible inside components,
  // instead we can use redirect function provided by react-router which basically create new response/ new request
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;

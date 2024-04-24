import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: 'TestPeparoni',
  //       quantity: 2,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },

    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter(
        (cartItem) => cartItem.pizzaId !== action.payload,
      );
    },

    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find(
        (cartItem) => cartItem.pizzaId === action.payload,
      );

      item.quantity++;
      item.totalPrice = item.unitPrice * item.quantity;
    },

    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find(
        (cartItem) => cartItem.pizzaId === action.payload,
      );

      item.quantity--;
      item.totalPrice = item.unitPrice * item.quantity;

      // we can reuse logic by manually calling a reducer with caseReducer
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },

    clearCart(state) {
      state.cart = [];
      //   state.cart = initialState;
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// we can relocate the data manipulation function inside its state slice and call inside the selector function is a recomended way of redux
// As a best practice these kind of functions starts with get keyword and place inside centralized location like cartSlice file

// However when we have a large application, we declare functions like this inside the stateSlice can be cost for performance, we can use 'reselect' library to handle those performance issues

export const getCart = (store) => store.cart.cart;

export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((sum, item) => (sum += item.quantity), 0);

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((sum, item) => (sum += item.totalPrice), 0);

// Nullish coalescing operator - logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
// below is a function that returns another function
export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// export function getCurrentQuantityById(id) {
//   const getQty = (store) =>
//     store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

//   return getQty;
// }

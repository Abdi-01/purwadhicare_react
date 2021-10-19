<<<<<<< HEAD
const INITIAL_STATE = { 
=======
const INITIAL_STATE = {
>>>>>>> 30d2c8ac61db530c279299c3552cb76421df9169
  cartList: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
<<<<<<< HEAD
  console.log(state.cartList)
  switch (action.type) {
    case "FILL_CART":
      return { ...state, cartList : action.payload };
=======
  console.log(state.cartList);
  switch (action.type) {
    case "FILL_CART":
      return { ...state, cartList: action.payload };
>>>>>>> 30d2c8ac61db530c279299c3552cb76421df9169

    default:
      return state;
  }
};

export default cartReducer;

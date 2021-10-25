const INITIAL_STATE = {
  cartList: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  console.log(state.cartList);
  switch (action.type) {
    case "FILL_CART":
      return { ...state, cartList: action.payload };
    case "DELETE_CART":
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};

export default cartReducer;

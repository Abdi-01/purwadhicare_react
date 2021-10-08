const init_state = {
  username: "bayu",
  fullName: "",
  email: "",
  address: "",
  age: "",
  profilePicture: "",
};

export default (state = init_state, action) => {
  switch (action.type) {
    case "CHANGE_USERNAME":
      return { ...state, username: action.payload };

    default:
      return state;
  }
};

import { COUNT, PRODUCT } from "./actions";
const initial = {
  count: [],
  product: [],
};
export default countreducer = (state = initial, action) => {
  switch (action.type) {
    case COUNT:
      return { ...state, count: action.payload };
    case PRODUCT:
      return { ...state, product: action.payload };
    default:
      return state;
  }
};

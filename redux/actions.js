export const COUNT = "COUNT";
export const PRODUCT = "PRODUCT";
export const setcount = (count) => (dispatch) => {
  dispatch({
    type: COUNT,
    payload: count,
  });
};
export const setproduct = (product) => (dispatch) => {
  dispatch({
    type: PRODUCT,
    payload: product,
  });
};

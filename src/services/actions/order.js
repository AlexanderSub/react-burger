import { getOrderRequest, checkResponse } from "../../utils/utils"

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST'
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED'
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS'

export const OPEN_ORDER_DETAILS = 'OPEN_ORDER_DETAILS'
export const CLOSE_ORDER_DETAILS = 'CLOSE_ORDER_DETAILS'

export function getOrder(ingredients) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderRequest(ingredients)
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.order
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    });
  };
}
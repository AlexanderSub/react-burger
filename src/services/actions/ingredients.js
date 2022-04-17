import { getIngredientsRequest, checkResponse } from "../../utils/utils"

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest()
    .then(checkResponse)
    .then(res => {
      if (res && res.success) {
          dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          data: res.data
        });
      } else {
        dispatch({
          type: GET_INGREDIENTS_FAILED
        });
      }
    });
  };
}
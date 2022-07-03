import { getOrderRequest, checkResponse } from "../../utils/utils"
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, OPEN_ORDER_DETAILS, CLOSE_ORDER_DETAILS } from '../constants'
import { AppDispatch, AppThunk } from "../types";
import { TOrder } from "../types/data";

export interface IGetOrderRequestAction {
  readonly type: typeof GET_ORDER_REQUEST
}

export interface IGetOrderSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS
  readonly order: TOrder
}

export interface IGetOrderFailedAction {
  readonly type: typeof GET_ORDER_FAILED
}

export interface IOpenOrderDetailsAction {
  readonly type: typeof OPEN_ORDER_DETAILS
}

export interface ICloseOrderDetailsAction {
  readonly type: typeof CLOSE_ORDER_DETAILS
}

export type TOrderActions = 
  | IGetOrderRequestAction
  | IGetOrderSuccessAction
  | IGetOrderFailedAction
  | IOpenOrderDetailsAction
  | ICloseOrderDetailsAction


export const getOrder: AppThunk = (ingredients) => {
  return function(dispatch: AppDispatch) {
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
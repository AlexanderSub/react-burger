import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE
} from '../constants'
import { TOrders } from '../types/data';

export interface IwsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START
  readonly payload: string
}
export interface IwsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS
}
export interface IwsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR
  readonly payload: string
}
export interface IwsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED
}
export interface IwsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: TOrders
}

export type TwsActions = 
  | IwsConnectionStartAction
  | IwsConnectionSuccessAction
  | IwsConnectionErrorAction
  | IwsConnectionClosedAction
  | IwsGetMessageAction

export const wsConnectionStart = (url: any): IwsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    payload: url
  };
};

export const wsConnectionSuccess = (): IwsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (message: string): IwsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: message
  };
};

export const wsConnectionClosed = (): IwsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = (message: TOrders): IwsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message
  };
};
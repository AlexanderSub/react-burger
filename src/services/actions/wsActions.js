import {
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from '../action-types/wsActionTypes';

export const wsConnectionStart = () => {
  return {
    type: WS_CONNECTION_START
  };
};

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetMessage = () => {
  return {
    type: WS_GET_MESSAGE,
  };
};


export const wsSendMessage = message => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};

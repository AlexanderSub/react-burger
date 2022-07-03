import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../constants"

const initialState = {
    data: [],
    dataRequest: false,
    dataFailed: false
}

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_INGREDIENTS_REQUEST: {
        return {
          ...state,
          dataRequest: true
        }
      }
      case GET_INGREDIENTS_SUCCESS: {
        return {
          ...state,
          dataFailed: false,
          data: action.data,
          dataRequest: false,
        }
      }
      case GET_INGREDIENTS_FAILED: {
        return { 
          ...state, 
          dataFailed: true, 
          dataRequest: false 
        }
      }
  
      default: {
        return state
      }
    }
  }


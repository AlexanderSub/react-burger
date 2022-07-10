import { TIngredientsActions } from "../actions/ingredients"
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../constants"
import { TIngredient } from "../types/data"

type TIngredientsState = {
  data: TIngredient[],
  dataRequest: boolean,
  dataFailed: boolean
}

const ingredientsInitialState: TIngredientsState = {
    data: [],
    dataRequest: false,
    dataFailed: false
}

export const ingredientsReducer = (state = ingredientsInitialState, action: TIngredientsActions): TIngredientsState => {
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


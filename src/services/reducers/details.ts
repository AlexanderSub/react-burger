import { TDetailsActions } from "../actions/details";
import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../constants";

type TDetailsState = {
  isOpen: boolean,
  ingredient: {}
}

const detailsInitialState: TDetailsState = {
  isOpen: false,
  ingredient: {}
}

export const detailsReducer = (state = detailsInitialState, action: TDetailsActions): TDetailsState => {
  switch (action.type) {
    case OPEN_INGREDIENT_DETAILS: {
      return {
        ...state,
        isOpen: true,
        ingredient: action.payload
      }
    }
      
    case CLOSE_INGREDIENT_DETAILS: {
      return {
        ...state,
        isOpen: false
      }
    }
  
    default:
      return state
  }
}
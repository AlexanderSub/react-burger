import { 
  OPEN_INGREDIENT_DETAILS, 
  CLOSE_INGREDIENT_DETAILS
} from '../actions/details'

const initialState = {
  isOpen: false,
  ingredient: {}
}

export const detailsReducer = (state = initialState, action) => {
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
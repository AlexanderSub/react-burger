import {
  ADD_BUN, 
  ADD_FILLING, 
  DELETE_FILLING, 
  MOVE_ITEM, 
  RESET_CONSTRUCTOR, 
  GENERATE_ID
} from '../constants'

const initialState = {
  bun: [],
  fillings: [],
  generateId: []
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUN: {
      return {
        ...state,
        bun: [action.payload]
      }
    }
    case ADD_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings, action.payload]
      }
    }
    case DELETE_FILLING: {
      return {
        ...state,
        fillings: [...state.fillings].filter((item, index) => index !== action.index)
      }
    }
    case MOVE_ITEM: {
      const ingredients = [...state.fillings]
      ingredients.splice(action.hoverIndex, 0, ingredients.splice(action.dragIndex, 1)[0])
      return {
        ...state,
        fillings: ingredients
      }
    }
    case GENERATE_ID: {
      return {
        ...state,
        generateId: [...state.generateId, action.payload],
      };
    }
    case RESET_CONSTRUCTOR: {
      return {
        ...initialState
      }
    }
    default:
      return state
  }
}
import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { detailsReducer } from './details'
import { orderReducer } from './order'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  details: detailsReducer,
  order: orderReducer
});

export default rootReducer;
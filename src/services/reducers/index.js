import { combineReducers } from 'redux'
import { ingredientsReducer } from './ingredients'
import { detailsReducer } from './details'
import { orderReducer } from './order'
import { constructorReducer } from './constructor'

const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  details: detailsReducer,
  burgerConstructor: constructorReducer,
  order: orderReducer,
});

export default rootReducer
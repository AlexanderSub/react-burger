import { OPEN_INGREDIENT_DETAILS, CLOSE_INGREDIENT_DETAILS } from "../constants";
import { TIngredient } from "../types/data";

export interface IOpenIngredientDetailsAction {
  readonly type: typeof OPEN_INGREDIENT_DETAILS
  readonly payload: TIngredient
}

export interface ICloseIngredientDetailsAction {
  readonly type: typeof CLOSE_INGREDIENT_DETAILS
}

export type TDetailsActions = 
  | IOpenIngredientDetailsAction
  | ICloseIngredientDetailsAction
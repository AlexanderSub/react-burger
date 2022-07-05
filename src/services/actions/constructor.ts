import {
  ADD_BUN, 
  ADD_FILLING, 
  DELETE_FILLING, 
  MOVE_ITEM, 
  RESET_CONSTRUCTOR, 
  GENERATE_ID
} from '../constants'
import { TIngredient } from '../types/data'

export interface IAddBunAction {
  readonly type: typeof ADD_BUN
  readonly payload: TIngredient
}

export interface IAddFillingAction {
  readonly type: typeof ADD_FILLING
  readonly payload: TIngredient
}

export interface IDeleteFillingAction {
  readonly type: typeof DELETE_FILLING
  readonly index: number
}

export interface IMoveItemAction {
  readonly type: typeof MOVE_ITEM
  readonly dragIndex: number
  readonly hoverIndex: number
}

export interface IResetConstructorAction {
  readonly type: typeof RESET_CONSTRUCTOR
}

export interface IGenerateIDAction {
  readonly type: typeof GENERATE_ID
  readonly payload: string
}

export type TConstructorActions = 
  | IAddBunAction
  | IAddFillingAction
  | IDeleteFillingAction
  | IMoveItemAction
  | IResetConstructorAction
  | IGenerateIDAction
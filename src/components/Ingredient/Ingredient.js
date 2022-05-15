import React from 'react'
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from "react-redux"
import IngredientStyles from './Ingredient.module.css'
import { OPEN_INGREDIENT_DETAILS } from '../../services/actions/details'
import { useDrag } from 'react-dnd'
import { ingredientPropType } from '../../utils/utils'

const Ingredient = ({data}) => {
  const dispatch = useDispatch()

  const id = data._id

  const fillings = useSelector(store => store.burgerConstructor.fillings)
  const bun = useSelector(store => store.burgerConstructor.bun)
  const burgerIngredients = [...bun, ...bun, ...fillings]
  const count = burgerIngredients.filter(el => el._id === id).length

  const [{isDrag}, ref] = useDrag({
    type: data.type,
    item: { id },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const openIngredientDetails = (ingredient) => {
    dispatch({
      type: OPEN_INGREDIENT_DETAILS,
      payload: ingredient
    })
  }

  return (
    !isDrag && (
      <li id={data._id} className={IngredientStyles.item} onClick={() => openIngredientDetails(data)} ref={ref} >
      {count ? <Counter count={count} size="default" /> : null}
      <img src={data.image} alt={data.name} className={`pl-4 pr-4 mb-1`}/>
      <div className={`${IngredientStyles.wrapper} mb-1`}>
        <p className={`text text_type_digits-default mr-2`}>{data.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`${IngredientStyles.span} text text_type_main-default`}>{data.name}</span>
    </li>
    )
  )
}

Ingredient.propTypes = {
  data: ingredientPropType.isRequired
}

export default Ingredient
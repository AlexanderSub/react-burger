import React from "react";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import IngredientItemStyles from './IngredientItem.module.css'

const IngredientItem = ({name, image, price}) => {
  return (
    <li className={IngredientItemStyles.item}>
      <Counter count={1} size="default" />
      <img src={image} alt={name} className={`pl-4 pr-4 mb-1`}/>
      <div className={`${IngredientItemStyles.wrapper} mb-1`}>
        <p className={`text text_type_digits-default mr-2`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <span className={`${IngredientItemStyles.span} text text_type_main-default`}>{name}</span>
    </li>
  )
}

export default IngredientItem
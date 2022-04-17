import React from "react";
import PropTypes from 'prop-types'
import IngredientDetailsStyles from './IngredientDetails.module.css'

const IngredientDetails = ({ data }) => {
  const { name, image_large, calories, proteins, fat, carbohydrates } = data
  const nutritionalValue = [
    {name: 'Калории,ккал', value: calories},
    {name: 'Белки, г', value: proteins},
    {name: 'Жиры, г', value: fat},
    {name: 'Углеводы, г', value: carbohydrates},
  ]

  return (
    <>
      <h2 className={`${IngredientDetailsStyles.title} text text_type_main-large mt-10`}>Детали ингредиента</h2>
      <img className="mb-4" src={image_large} alt={name} />
      <h3 className="text text_type_main-medium mb-8">{name}</h3>

      <ul className={`${IngredientDetailsStyles.list} mb-15`}>
        {
          nutritionalValue.map(({name, value}) => {
            return(
              <li key={`ingredient._id ${name}`} className={IngredientDetailsStyles.item}>
                <p className="text text_type_main-default text_color_inactive mb-2">{name}</p>
                <p className="text text_type_digits-default text_color_inactive">{value}</p>
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

IngredientDetails.propTypes = {
  data: PropTypes.object.isRequired
}

export default IngredientDetails
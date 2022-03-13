import React from "react";
import PropTypes from 'prop-types'
import IngredientDetailsStyles from './IngredientDetails.module.css'
import Modal from "../Modal/Modal";

const IngredientDetails = ({closeModal, ingredient}) => {

  const nutritionalValue = [
    {name: 'Калории,ккал', value: ingredient.calories},
    {name: 'Белки, г', value: ingredient.proteins},
    {name: 'Жиры, г', value: ingredient.fat},
    {name: 'Углеводы, г', value: ingredient.carbohydrates},
  ]

  return (
    <Modal className={IngredientDetailsStyles.container} closeModal={closeModal}>
      <h2 className={`${IngredientDetailsStyles.title} text text_type_main-large mt-10`}>Детали ингредиента</h2>
      <img className="mb-4" src={ingredient.image_large} alt={ingredient.name} />
      <h3 className="text text_type_main-medium mb-8">{ingredient.name}</h3>

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
    </Modal>
  )
}

IngredientDetails.propTypes = {
  ingredient: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default IngredientDetails
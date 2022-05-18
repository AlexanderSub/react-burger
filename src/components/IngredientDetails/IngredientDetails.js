import React from 'react'
import IngredientDetailsStyles from './IngredientDetails.module.css'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ClipLoader } from 'react-spinners'

const IngredientDetails = () => {
  const { id } = useParams()
  const ingredients = useSelector(state => state.ingredients.data)
  const currentIngredient = ingredients.find(ingredient => ingredient._id === id)

  if (!ingredients) {
    return <ClipLoader color={'#fff'} size={100} css={'position: absolute; top: 50%; left: 50%;'} />
  }


  console.log(currentIngredient)

  const { name, image_large, calories, proteins, fat, carbohydrates } = currentIngredient
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

// IngredientDetails.propTypes = {
//   data: ingredientPropType.isRequired
// }

export default IngredientDetails
import IngredientDetailsStyles from './IngredientDetails.module.css'
import { useSelector } from '../../services/hooks'
import { useParams } from 'react-router-dom'

const IngredientDetails = () => {
  const { id } = useParams<{id: string}>()
  const ingredients = useSelector(state => state.ingredients.data)
  const currentIngredient = ingredients.find(ingredient => ingredient._id === id)

  if (!currentIngredient) return null

  const nutritionalValue = [
    {name: 'Калории,ккал', value: currentIngredient.calories},
    {name: 'Белки, г', value: currentIngredient.proteins},
    {name: 'Жиры, г', value: currentIngredient.fat},
    {name: 'Углеводы, г', value: currentIngredient.carbohydrates},
  ]

  return (
    <>
      <h2 className={`${IngredientDetailsStyles.title} text text_type_main-large`}>Детали ингредиента</h2>
      <img className="mb-4" src={currentIngredient.image_large} alt={currentIngredient.name} />
      <h3 className="text text_type_main-medium mb-8">{currentIngredient.name}</h3>

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

export default IngredientDetails
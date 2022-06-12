import IngredientDetails from "../../components/IngredientDetails/IngredientDetails"
import IngredientPageStyles from './ingredient-page.module.css'

const IngredientPage = () => {

  return (
    <div className={`${IngredientPageStyles.wrapper} mt-30`}>
      <IngredientDetails />
    </div>
  )
}

export default IngredientPage
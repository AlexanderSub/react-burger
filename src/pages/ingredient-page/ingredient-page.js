import React from "react";
import { useParams } from "react-router-dom";
import IngredientDetails from "../../components/IngredientDetails/IngredientDetails";
import IngredientPageStyles from './ingredient-page.module.css'

const IngredientPage = () => {
  let { id } = useParams()

  return (
    <div className={`${IngredientPageStyles.wrapper} mt-30`}>
      <IngredientDetails id={id} />
    </div>
  )
}

export default IngredientPage
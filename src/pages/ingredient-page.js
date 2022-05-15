import React from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import IngredientDetails from "../components/IngredientDetails/IngredientDetails";

const IngredientPage = () => {
  const ingredients = useSelector(store => store.ingredients.data)
  const match = useMatch('/ingredients/:id')

  const ingr = (arr, id) => {
    return arr.filter(el => el._id === id)[0]
  } 

  const data = ingr(ingredients, '60d3b41abdacab0026a733c6')

  console.log(data)

  return (
    // <IngredientDetails data={ingredients.filter(item => item._id === match.params.id)} />
    <IngredientDetails data={data} />
  )
}

export default IngredientPage
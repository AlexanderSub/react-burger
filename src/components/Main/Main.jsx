import React from "react";
import MainStyles from './Main.module.css'
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import {data} from '../../utils/data'

const Main = () => {
  return (
    <main className={MainStyles.main}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </main>
  )
}

export default Main
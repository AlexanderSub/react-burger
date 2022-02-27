import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import IngredientItem from "../IngredientItem/IngredientItem";

const BurgerIngredients = ({ data }) => {
  const [current, setCurrent] = React.useState('bun')

  const buns = data.filter(ingredient => ingredient.type === 'bun')
  .map(ingredient => <IngredientItem key={ingredient._id} {...ingredient} />)

  const sauces = data.filter(ingredient => ingredient.type === 'sauce')
  .map(ingredient => <IngredientItem key={ingredient._id} {...ingredient} />)

  const mains = data.filter(ingredient => ingredient.type === 'main')
  .map(ingredient => <IngredientItem key={ingredient._id} {...ingredient} />)

  return (
    <section className={BurgerIngredientsStyles.section}>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <nav className={`${BurgerIngredientsStyles.nav} mb-10`}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>Булки</Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>Соусы</Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
      </nav>
      <div className={`${BurgerIngredientsStyles.window} custom-scroll`}>
        <section className={BurgerIngredientsStyles.menu}>
          <h2 className='text text_type_main-medium mb-6' id='bun'>Булки</h2>
          <ul className={`${BurgerIngredientsStyles.list} pl-4 pr-4 mb-10`}>
            {buns}
          </ul>
        </section>

        <section className={BurgerIngredientsStyles.menu}>
          <h2 className='text text_type_main-medium mb-6' id='sauce'>Соусы</h2>
          <ul className={`${BurgerIngredientsStyles.list} pl-4 pr-4 mb-10`}>
            {sauces}
          </ul>
        </section>

        <section className={BurgerIngredientsStyles.menu}>
          <h2 className='text text_type_main-medium mb-6' id='main'>Начинки</h2>
          <ul className={`${BurgerIngredientsStyles.list} pl-4 pr-4 mb-10`}>
            {mains}
          </ul>
        </section>
      </div>

    </section>

  )
}

export default BurgerIngredients
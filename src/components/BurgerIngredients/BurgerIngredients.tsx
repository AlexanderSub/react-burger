import { useState, createRef } from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { useSelector } from '../../services/hooks'
import { Ingredient } from '../Ingredient/Ingredient'

const BurgerIngredients = () => {
  const ingredients = useSelector(store => store.ingredients.data)

  const [current, setCurrent] = useState('bun')

  const ingredientContainer = createRef<HTMLDivElement>();
  const bun = createRef<HTMLDivElement>();
  const sauce = createRef<HTMLDivElement>();
  const main = createRef<HTMLDivElement>();

  const handleScroll = () => {
    const tab = () => {
      if (ingredientContainer.current!.scrollTop - bun.current!.clientHeight < 0) {
        return 'bun';
      } else if (ingredientContainer.current!.scrollTop - bun.current!.clientHeight - sauce.current!.clientHeight < 0) {
        return 'sauce';
      } else {
        return 'main';
      }
    }
    setCurrent(tab);
  }

  const buns = ingredients.filter(ingredient => ingredient.type === 'bun')
  const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce')
  const mains = ingredients.filter(ingredient => ingredient.type === 'main')

  return (
    <section className={BurgerIngredientsStyles.section}>
      <h1 className={`text text_type_main-large mt-10 mb-5`}>Соберите бургер</h1>
      <nav className={`${BurgerIngredientsStyles.nav} mb-10`}>
        <a href='#bun' className={BurgerIngredientsStyles.link}>
          <Tab value='bun' active={current === 'bun'} onClick={setCurrent} >Булки</Tab>
        </a>
        <a href='#sauce' className={BurgerIngredientsStyles.link}>
          <Tab value='sauce' active={current === 'sauce'} onClick={setCurrent} >Соусы</Tab>    
        </a>
        <a href='#main' className={BurgerIngredientsStyles.link}>
          <Tab value='main' active={current === 'main'} onClick={setCurrent}>Начинки</Tab>
        </a>
      </nav>

      <div ref={ingredientContainer} className={`${BurgerIngredientsStyles.window} custom-scroll`} onScroll={handleScroll}>
        <section ref={bun} className={BurgerIngredientsStyles.menu}>
          <h2 className='text text_type_main-medium mb-6' id={'bun'}>Булки</h2>
          <ul className={`${BurgerIngredientsStyles.list} pl-4 pr-4 mb-10`}>
            {buns.map(item => <Ingredient {...item} key={item._id}/>)}
          </ul>
        </section>

        <section ref={sauce} className={BurgerIngredientsStyles.menu}>
          <h2 className='text text_type_main-medium mb-6' id={'sauce'}>Соусы</h2>
          <ul className={`${BurgerIngredientsStyles.list} pl-4 pr-4 mb-10`} >
            {sauces.map(item => <Ingredient {...item} key={item._id}/>)}
          </ul>
        </section>

        <section ref={main} className={BurgerIngredientsStyles.menu}>
          <h2 className='text text_type_main-medium mb-6' id={'main'}>Начинки</h2>
          <ul className={`${BurgerIngredientsStyles.list} pl-4 pr-4 mb-10`}>
            {mains.map(item => <Ingredient {...item} key={item._id}/>)}
          </ul>
        </section>
      </div>
    </section>
  )
}

export default BurgerIngredients
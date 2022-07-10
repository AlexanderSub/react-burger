import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import AppStyles from '../components/App/App.module.css'
import BurgerConstructor from "../components/BurgerConstructor/BurgerConstructor"
import BurgerIngredients from "../components/BurgerIngredients/BurgerIngredients"

const Main = () => {
  return (
    <main className={AppStyles.main}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  )
}

export default Main
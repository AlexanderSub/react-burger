import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from '../../services/hooks'
import IngredientStyles from './Ingredient.module.css'
import { useDrag } from 'react-dnd'
import { Link, useLocation } from 'react-router-dom'
import { TIngredient } from '../../services/types/data'

export const Ingredient = (props: TIngredient) => {
  let location = useLocation()
  const id = props._id

  const fillings = useSelector(store => store.burgerConstructor.fillings)
  const bun = useSelector(store => store.burgerConstructor.bun)
  const burgerIngredients = [...bun, ...bun, ...fillings]
  const count = burgerIngredients.filter(el => el._id === id).length

  const [, ref] = useDrag({
    type: props.type,
    item: { id }
  })

  return (
    <li id={props._id} className={IngredientStyles.item} ref={ref} >
      <Link className={IngredientStyles.link} to={{ pathname: `/ingredients/${id}`, state: { background: location } }}>
        {count ? <Counter count={count} size="default" /> : null}
        <img src={props.image} alt={props.name} className={`pl-4 pr-4 mb-1`}/>
        <div className={`${IngredientStyles.wrapper} mb-1`}>
          <p className={`text text_type_digits-default mr-2`}>{props.price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <span className={`${IngredientStyles.span} text text_type_main-default`}>{props.name}</span>
      </Link>
    </li>
  )
}
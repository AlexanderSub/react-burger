import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from '../../services/hooks'
import IngredientStyles from './Ingredient.module.css'
import { useDrag } from 'react-dnd'
import { Link, useLocation } from 'react-router-dom'
import { TIngredient } from '../../services/types/data'
import { FC } from 'react'

type TIngredientProps = {
  data: TIngredient
}

const Ingredient: FC<TIngredientProps> = ({data}) => {
  let location = useLocation()
  const id = data._id

  const fillings = useSelector(store => store.burgerConstructor.fillings)
  const bun = useSelector(store => store.burgerConstructor.bun)
  const burgerIngredients = [...bun, ...bun, ...fillings]
  const count = burgerIngredients.filter(el => el._id === id).length

  const [{isDrag}, ref] = useDrag({
    type: data.type,
    item: { id },
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  return (
    !isDrag && (
      <li id={data._id} className={IngredientStyles.item} ref={ref} >
        <Link className={IngredientStyles.link} to={{ pathname: `/ingredients/${id}`, state: { background: location } }}>
          {count ? <Counter count={count} size="default" /> : null}
          <img src={data.image} alt={data.name} className={`pl-4 pr-4 mb-1`}/>
          <div className={`${IngredientStyles.wrapper} mb-1`}>
            <p className={`text text_type_digits-default mr-2`}>{data.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <span className={`${IngredientStyles.span} text text_type_main-default`}>{data.name}</span>
        </Link>
      </li>
    )
  )
}

export default Ingredient
import OrderStyles from './Order.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { formatDate } from '../../utils/utils'
import { Link, useLocation } from 'react-router-dom'

export const Order = ({data}) => {
  const location = useLocation()
  const ingredients = useSelector(state => state.ingredients.data)

  const selectedIngredients = ingredients.filter(ingredient => data.ingredients.includes(ingredient._id))

  let restIngredients

  if (selectedIngredients.length > 5) {
    restIngredients = selectedIngredients.splice(5)
  }

  const burgerPrice = useMemo(
    () => {
      return selectedIngredients.reduce((acc, el) => acc + ( el.type === 'bun' ? el.price * 2 : el.price ), 0)
    },
    [selectedIngredients]
  )

  return (
    <Link className={OrderStyles.link} to={{ pathname: `/feed/${data._id}`, state: { background: location } }}>
    <li className={`${OrderStyles.card} p-6 mb-4`}>
      <div className={`${OrderStyles.cardWrapper} mb-6`}>
        <span className='text text_type_digits-default'>{`#${data.number}`}</span>
        <span className='text text_type_main-default text_color_inactive'>{formatDate(data.createdAt)}</span>
      </div>
      <h3 className='text text_type_main-medium mb-6'>{data.name}</h3>
      <div className={`${OrderStyles.cardWrapper}`}>
        <div className={OrderStyles.images}>
          {restIngredients && restIngredients.length > 0 ? (
            <div className={OrderStyles.image} style={{backgroundImage: `url(${restIngredients[0].image_mobile})`}}>
              <p className={`${OrderStyles.rest} text text_type_main-default`}>+{restIngredients.length}</p>
            </div>
            ) : '' }
          {
            selectedIngredients.reverse().map(ingredient => {
              return (
                <div key={ingredient._id} className={OrderStyles.image} style={{backgroundImage: `url(${ingredient.image_mobile})`}}/>
              )
            })
          }
        </div>
        <div className={`${OrderStyles.price}`}>
          <p className={`text text_type_digits-default mr-2`}>{burgerPrice ? burgerPrice : 0}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </li>
    </Link>
  )
}
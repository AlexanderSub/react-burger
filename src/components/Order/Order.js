import OrderStyles from './Order.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { formatDate } from '../../utils/utils'
import PropTypes from 'prop-types'
import { orderPropType } from '../../utils/types'

export const Order = ({data, showStatus}) => {
  const ingredients = useSelector(state => state.ingredients.data)

  const selectedIngredients = data.ingredients.map(
    ingredientId => ingredients.find(
      ingredient => ingredient._id === ingredientId
    )
  )

  const burgerPrice = useMemo(
    () => {
      return selectedIngredients.reduce((acc, el) => acc + el.price, 0)
    },
    [selectedIngredients]
  )

  let restIngredients

  if (selectedIngredients.length > 5) {
    restIngredients = selectedIngredients.splice(5)
  }

  return (
    <li className={`${OrderStyles.card} p-6 mb-4`}>
      <div className={`${OrderStyles.cardWrapper} mb-6`}>
        <span className='text text_type_digits-default'>{`#${data.number}`}</span>
        <span className='text text_type_main-default text_color_inactive'>{formatDate(data.createdAt)}</span>
      </div>
      <div className={`${OrderStyles.titleWrapper} mb-6`}>
        <h3 className='text text_type_main-medium'>{data.name}</h3>
        {showStatus && 
          <span className='text text_type_main-default' style={data.status === 'done' ? {color: '#0CC'} : ''}>
            {data.status === 'created' ? 'Создан' : data.status === 'pending' ? 'Готовится' : data.status === 'done' ? 'Выполнен' : ''}
          </span>
        }
      </div>
      <div className={`${OrderStyles.cardWrapper}`}>
        <div className={OrderStyles.images}>
          {restIngredients && restIngredients.length > 0 ? (
            <div className={OrderStyles.image} style={{backgroundImage: `url(${restIngredients[0].image_mobile})`}}>
              <p className={`${OrderStyles.rest} text text_type_main-default`}>+{restIngredients.length}</p>
            </div>
            ) : '' }
          {
            selectedIngredients.reverse().map((ingredient, index) => {
              return (
                <div key={index + ingredient._id} className={OrderStyles.image} style={{backgroundImage: `url(${ingredient.image_mobile})`}}/>
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
  )
}

Order.propTypes = {
  data: orderPropType.isRequired,
  showStatus: PropTypes.bool.isRequired
}
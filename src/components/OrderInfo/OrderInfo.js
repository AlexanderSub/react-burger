import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useParams } from "react-router-dom"
import { WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/constants"
import { wsConnectionStart } from "../../services/actions/wsActions"
import { formatDate } from "../../utils/utils"
import { Preloader } from "../Preloader/Preloader"
import OrderInfoStyles from './OrderInfo.module.css'

export const OrderInfo = () => {
  const location = useLocation()
  const dispatch = useDispatch()

  const { id } = useParams()
  const ingredients = useSelector(state => state.ingredients.data)
  const orderData = useSelector(state => state.ws.orders)

  let currentOrder
  let selectedIngredients
  let uniqueIngredients
  let burgerPrice

  if (ingredients.length && orderData.length) {
    currentOrder = orderData?.find(order => order._id === id)

    selectedIngredients = currentOrder.ingredients.map(
      ingredientId => ingredients.find(
        ingredient => ingredient._id === ingredientId
      )
    );
  
    uniqueIngredients = [... new Set(selectedIngredients)]
  
    burgerPrice = selectedIngredients.reduce((acc, el) => acc + el.price, 0)
  }

  useEffect(() => {
    if (location.pathname.includes('feed')) {
      dispatch(wsConnectionStart('/all'))
    } else if (location.pathname.includes('profile')) {
      dispatch({ 
        type: WS_CONNECTION_START,
        user: true,
      });
    }
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [])



  if (!ingredients) {
    return <Preloader />;
  }

  if (!orderData.length) {
    return <Preloader />;
  }

  return (
    <div className={OrderInfoStyles.card}>
      <h4 className={`${OrderInfoStyles.number} text text_type_digits-default mb-5`}>#{currentOrder.number}</h4>
      <h3 className={`${OrderInfoStyles.title} text text_type_main-medium mb-2`}>{currentOrder.name}</h3>
      <p className={`${OrderInfoStyles.status} text text_type_main-small`}>{currentOrder.status === 'done' ? 'Выполнен' : 'Готовится'}</p>
      <p className={`text text_type_main-medium mb-6 mt-15`}>Состав:</p>
      <ul className={`${OrderInfoStyles.list} custom-scroll mb-15`}>
        {uniqueIngredients.map((ingredient, index) => (
          <li className={`${OrderInfoStyles.listItem} mb-4 mr-6`} key={index + ingredient._id}>
            <div className={OrderInfoStyles.image} style={{backgroundImage: `url(${ingredient.image_mobile})`}}/>
            <p className={`${OrderInfoStyles.name} text text_type_main-default`}>{ingredient.name}</p>
            <div className={`${OrderInfoStyles.price}`}>
              <p className={`text text_type_digits-default mr-2`}>
                {`${selectedIngredients.filter(el => el._id === ingredient._id).length} x ${ingredient.price}`}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        ))}
      </ul>
      <div className={OrderInfoStyles.wrapper}>
        <span className='text text_type_main-default text_color_inactive'>{formatDate(currentOrder.createdAt)}</span>
        <div className={`${OrderInfoStyles.price}`}>
          <p className={`text text_type_digits-default mr-2`}>{burgerPrice ? burgerPrice : 0}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}
import { useEffect } from "react"
import ProfileStyles from './profile.module.css'
import { Link, NavLink, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from '../../services/hooks'
import { logout } from "../../services/actions/auth"
import { Order } from "../../components/Order/Order"
import { WS_CONNECTION_START } from "../../services/constants"
import { Preloader } from "../../components/Preloader/Preloader"

const Orders = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const orders = useSelector(state => state.ws.orders)

  const logoutHandler = () => {
    dispatch(
      logout()
    )
  }

  useEffect(() => {
    dispatch({
      type: WS_CONNECTION_START,
      user: true
    })
  }, [dispatch])

  if (!orders.length) {
    return(
      <Preloader text={'Загрузка данных о заказах'} />
    )
  }


  return (
    <section className={`${ProfileStyles.profile} mt-30`}>
      <div className={`${ProfileStyles.leftContainer} mr-10`}>
        <NavLink
          exact
          to='/profile'
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={ProfileStyles.active}
        >
          Профиль
        </NavLink>
        <NavLink
          exact
          to='/profile/orders' 
          className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive`}
          activeClassName={ProfileStyles.active}
        >
          История заказов
        </NavLink>
        <p onClick={logoutHandler} className={`${ProfileStyles.link} text text_type_main-medium text_color_inactive mb-20`}>Выход</p>
        <p className={`${ProfileStyles.text} text text_type_main-medium text_color_inactive`}>В этом разделе вы можете просмотреть свою историю заказов</p>
      </div>
      <div>
        <ul className={`${ProfileStyles.orders} custom-scroll`}>
          {orders.map(order => 
          <Link key={order._id} className={ProfileStyles.card} to={{ pathname: `/profile/orders/${order._id}`, state: { background: location } }}>
            <Order data={order} showStatus={true}/>
          </Link>
          ).reverse()}
        </ul>
      </div>
    </section>
  )
}

export default Orders
import { OrderInfo } from "../../components/OrderInfo/OrderInfo"
import OrderPageStyles from './order-page.module.css'

const OrderPage = () => {
  return (
    <div className={`${OrderPageStyles.wrapper} mt-30`}>
      <OrderInfo />
    </div>
  )
}

export default OrderPage
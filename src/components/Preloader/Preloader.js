import { ClipLoader } from 'react-spinners'
import PreloaderStyles from './Preloader.module.css'
import PropTypes from 'prop-types'

export const Preloader = ({text}) => {
  return (
    <div className={PreloaderStyles.loader}>
      <h4 className={`${PreloaderStyles.text} text text_type_main-medium mb-4`}>{text}</h4>
      <ClipLoader color={'#fff'} size={100} />
    </div>  
  )
}

Preloader.propTypes = {
  text: PropTypes.string
}
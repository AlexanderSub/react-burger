import { ClipLoader } from 'react-spinners'
import PreloaderStyles from './Preloader.module.css'
import { FC } from 'react'

export const Preloader: FC<{text: string}> = ({text}) => {
  return (
    <div className={PreloaderStyles.loader}>
      <h4 className={`${PreloaderStyles.text} text text_type_main-medium mb-4`}>{text}</h4>
      <ClipLoader color={'#fff'} size={100} />
    </div>  
  )
}
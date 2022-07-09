import { FC } from 'react'
import ModalOverlayStyles from './ModalOverlay.module.css'

type TModalOverLayProps = {
  onClose: () => void
}

const ModalOverlay: FC<TModalOverLayProps> = ({onClose}) => {
  return (
    <div className={ModalOverlayStyles.overlay} onClick={onClose} />
  )
}

export default ModalOverlay
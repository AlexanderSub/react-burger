import React, { useRef } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { DELETE_FILLING } from '../../services/actions/constructor'
import { ingredientPropType } from '../../utils/types'
import PropTypes from 'prop-types'
import BurgerConstructorItemStyles from './BurgerConstructorItem.module.css'

export const BurgerConstructorItem = ({data, index, moveItem}) => {
  const dispatch = useDispatch()
  const ref = useRef(null)

  const [{isDrag}, dragRef] = useDrag({
    type: 'item',
    item: {index},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const opacity = isDrag ? 0.5 : 1

  const [, dropRef] = useDrop({
    accept: 'item',
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  const dndRef = dragRef(dropRef(ref))

  const onDelete = () => {
    dispatch({
      type: DELETE_FILLING,
      index
    })
  }

  return (
    <div className={BurgerConstructorItemStyles.ingredient} ref={dndRef} style={{opacity}}>
      <DragIcon type="primary" />
      <ConstructorElement 
        text={data.name}
        price={data.price} 
        thumbnail={data.image}
        handleClose={(e) => onDelete(e.target)}
      />
    </div>
  )
}

BurgerConstructorItem.propTypes = {
  data: ingredientPropType.isRequired,
  index: PropTypes.number.isRequired,
  moveItem: PropTypes.func.isRequired
}
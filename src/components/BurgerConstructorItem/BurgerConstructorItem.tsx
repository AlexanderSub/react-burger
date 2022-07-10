import { FC, useRef } from 'react'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch } from '../../services/hooks'
import { DELETE_FILLING } from '../../services/constants'
import BurgerConstructorItemStyles from './BurgerConstructorItem.module.css'
import { TIngredient } from '../../services/types/data'

type TBurgerConstructorItemProps = {
  data: TIngredient,
  index: number,
  moveItem: (dragIndex: number, hoverIndex: number) => void
}


export const BurgerConstructorItem: FC<TBurgerConstructorItemProps> = ({data, index, moveItem}) => {
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null)

  const [{isDrag}, dragRef] = useDrag({
    type: 'item',
    item: {data, index},
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  })

  const opacity = isDrag ? 0.5 : 1

  const [, dropRef] = useDrop({
    accept: 'item',
    hover(item: TBurgerConstructorItemProps, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as any).y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      moveItem(dragIndex, hoverIndex)
      item.index = hoverIndex
    }
  })

  dragRef(dropRef(ref))

  const onDelete = () => {
    dispatch({
      type: DELETE_FILLING,
      index
    })
  }

  return (
    <div className={BurgerConstructorItemStyles.ingredient} ref={ref} style={{opacity}}>
      <DragIcon type="primary" />
      <ConstructorElement 
        text={data.name}
        price={data.price} 
        thumbnail={data.image}
        handleClose={() => onDelete()}
      />
    </div>
  )
}
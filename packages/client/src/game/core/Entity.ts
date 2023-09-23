import { TOffset, TPoint, TSize, boxCollides } from './utils/calculations'

interface EntityProps {
  position: TPoint
  offset: TOffset
  size: TSize
}

export default class Entity {
  position: TPoint
  offset: TOffset
  size: TSize

  constructor(props: EntityProps) {
    this.position = props.position
    this.offset = props.offset
    this.size = props.size
  }

  // проверка пересечения двух сущностей
  public static isCollide(e1: Entity, e2: Entity) {
    return boxCollides(e1.position, e1.size, e2.position, e2.size)
  }
}

import { GAME_OPTIONS } from '../../constants/game'
import { TOffset, TPoint, TSize, boxCollides } from './utils/Calculations'

interface EntityProps {
  position: TPoint
  offset: TOffset
  size: TSize
}

export default class Entity {
  position: TPoint
  offset: TOffset
  size: TSize
  deleted: boolean

  constructor(props: EntityProps) {
    this.position = props.position
    this.offset = props.offset
    this.size = props.size
    this.deleted = false
  }

  // проверка пересечения двух сущностей
  public static isCollide(entity1: Entity, entity2: Entity) {
    return boxCollides(
      entity1.position,
      entity1.size,
      entity2.position,
      entity2.size
    )
  }
  // проверить находится сущность за сценой
  public static isOutside(entity: Entity) {
    return !boxCollides(
      { x: 0, y: 0 },
      {
        width: GAME_OPTIONS.CANVAS_WIDTH + 1,
        height: GAME_OPTIONS.CANVAS_HEIGHT + 1,
      },
      entity.position,
      entity.size
    )
  }
}

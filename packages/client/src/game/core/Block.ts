import { TOffset, TPoint, TSize } from './utils/Calculations'

interface BlockProps {
  position: TPoint
  offset: TOffset
  size: TSize
}

// TODO: на перспективу препятствия (состоящие из блоков) мешающие движению игрока
export default class Block {
  position: TPoint
  offset: TOffset
  size: TSize

  constructor(props: BlockProps) {
    this.position = props.position
    this.offset = props.offset
    this.size = props.size
  }

  // трассировка объектов на сцене
  public debugDraw(
    ctx: CanvasRenderingContext2D,
    color = 'silver',
    lineWidth = 3
  ) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
  }
}

import { GAME_OPTIONS } from '../../constants/game'
import {
  TOffset,
  TPoint,
  TSize,
  boxCollides,
  randomRange,
} from './utils/Calculations'

interface ParticleProps {
  position: TPoint
  offset: TOffset
  size: TSize
  color?: string
  life?: number
  move?: boolean
}

export default class Particle {
  position: TPoint
  offset: TOffset
  size: TSize
  color: string
  life: number
  move: boolean
  deleted: boolean

  constructor(props: ParticleProps) {
    this.position = props.position
    this.offset = props.offset
    if (this.offset.dx == 0 && this.offset.dy == 0) {
      this.offset.dx = randomRange(-2, 2)
      this.offset.dy = randomRange(-2, 2)
    }
    this.size = props.size
    this.color = props.color ?? 'black'
    this.life = props.life ?? 100
    this.move = props.move ?? true
    this.deleted = false
  }

  public update(dt: number) {
    if (this.move) {
      this.position.x += this.offset.dx * dt
      this.position.y += this.offset.dy * dt
    }
    this.life--
    if (this.position.y >= GAME_OPTIONS.FLOOR_HEIGHT) {
      this.life = 0
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.life / 40,
      this.life / 40
    )
  }
}

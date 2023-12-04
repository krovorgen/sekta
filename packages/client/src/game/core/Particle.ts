import { GAME_OPTIONS } from '../../constants/game'
import { TOffset, TPoint, TSize, randomRange } from './utils/Calculations'

interface ParticleProps {
  position: TPoint
  offset?: TOffset
  size?: TSize
  color?: string
  life?: number
  move?: boolean
}

export default class Particle {
  position: TPoint
  offset: TOffset
  size?: TSize
  life: number
  color: string
  move: boolean

  constructor(props: ParticleProps) {
    this.position = props.position
    this.offset = props.offset ?? { dx: 0, dy: 0 }
    if (this.offset.dx == 0 && this.offset.dy == 0) {
      this.offset.dx = randomRange(-200, 200)
      this.offset.dy = randomRange(-200, 200)
    }
    this.size = props.size
    this.color = props.color ?? 'black'
    this.life = props.life ?? 100
    this.move = props.move ?? true
  }

  public update(dt: number) {
    if (this.move) {
      this.position.x += this.offset.dx * dt
      this.position.y += this.offset.dy * dt
    }
    this.life--
    const floorX = GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT
    if (this.position.y >= floorX) {
      this.life = 0
    }
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size?.width ?? this.life / 40,
      this.size?.height ?? this.life / 40
    )
  }
}

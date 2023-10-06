import Entity from '../Entity'
import { GAME_OPTIONS } from '../../../constants/game'
import { randomRange } from '../utils/Calculations'
import AnimatedSprite from '../utils/AnimatedSprite'

const {
  FIREBALL_WIDTH,
  FIREBALL_HEIGHT,
  FIREBALL_SPEED_MIN,
  FIREBALL_SPEED_MAX,
} = GAME_OPTIONS

export default class Fireball extends Entity {
  sprite?: AnimatedSprite

  constructor(sprite?: AnimatedSprite) {
    super({
      position: {
        x: randomRange(0, GAME_OPTIONS.CANVAS_WIDTH),
        y: -FIREBALL_HEIGHT,
      },
      offset: {
        dx: randomRange(-1, 1),
        dy: randomRange(FIREBALL_SPEED_MIN, FIREBALL_SPEED_MAX),
      },
      size: { width: FIREBALL_WIDTH, height: FIREBALL_HEIGHT },
    })
    this.sprite = sprite
  }

  public update(dt: number) {
    this.position.x += this.offset.dx * dt
    this.position.y += this.offset.dy * dt

    // воспроизведение анимации
    this.sprite?.update(dt)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.sprite) {
      this.sprite.render(ctx, this)
    } else {
      ctx.beginPath()
      ctx.rect(
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
      )
      ctx.fillStyle = 'red'
      ctx.fill()
      ctx.closePath()
    }
  }
}

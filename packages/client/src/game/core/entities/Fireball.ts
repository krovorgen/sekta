import Entity from '../Entity'
import { GAME_OPTIONS, GAME_RESOURCES } from '../../../constants/game'
import { randomRange } from '../utils/Calculations'
import AnimatedSprite from '../utils/AnimatedSprite'
import Resources from '../utils/Resources'

const {
  FIREBALL_WIDTH,
  FIREBALL_HEIGHT,
  FIREBALL_SPEED_MIN,
  FIREBALL_SPEED_MAX,
} = GAME_OPTIONS

export default class Fireball extends Entity {
  sprite?: AnimatedSprite

  constructor(resources: Resources) {
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
    if (!resources) return
    this.sprite = new AnimatedSprite({
      resource: resources.get(GAME_RESOURCES.FIREBALL),
      mapPoint: { x: 0, y: 0 },
      frameSize: { height: 512, width: 512 },
      resultSize: { height: 20 * 5, width: 20 * 5 },
      angle: 90,
      speed: 25,
    })
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

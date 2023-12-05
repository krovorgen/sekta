import { GAME_OPTIONS } from '../../../constants/game'
import { GAME_RESOURCES } from '../../../constants/resources'
import Entity from '../Entity'
import AnimatedSprite from '../utils/AnimatedSprite'
import Resources from '../utils/Resources'
import { randomElem } from '../utils/Calculations'

const { TRAP_WIDTH, TRAP_HEIGHT, TRAP_SPEED } = GAME_OPTIONS

export default class Trap extends Entity {
  sprite?: AnimatedSprite

  constructor(resources?: Resources) {
    super({
      position: {
        x: GAME_OPTIONS.CANVAS_WIDTH,
        y: GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT - TRAP_HEIGHT,
      },
      offset: { dx: -TRAP_SPEED, dy: 0 },
      size: { width: TRAP_WIDTH, height: TRAP_HEIGHT },
    })
    if (!resources) return
    const trapResources: Array<{ resource: string; size: number }> = [
      { resource: GAME_RESOURCES.SPEARS, size: 50 },
      { resource: GAME_RESOURCES.SPEARS_2, size: 75 },
      { resource: GAME_RESOURCES.SPEARS_3, size: 75 },
      { resource: GAME_RESOURCES.SPEARS_4, size: 75 },
      { resource: GAME_RESOURCES.TRAP, size: 75 },
      { resource: GAME_RESOURCES.TRAP_2, size: 100 },
    ]
    // случайный выбор вида следующей ловушки
    const trapResource = randomElem(trapResources) as {
      resource: string
      size: number
    }
    this.position.x += trapResource.size - TRAP_WIDTH
    this.sprite = new AnimatedSprite({
      resource: resources.get(trapResource.resource),
      mapPoint: { x: 0, y: 0 },
      resultSize: { height: trapResource.size, width: trapResource.size },
    })
  }

  public isOutside() {
    const rightBorderX = this.sprite?.resultSize.width ?? this.size.width
    return this.position.x + rightBorderX < 0 // правая граница вышла за пределы холста
  }

  public update(dt: number) {
    this.position.x += this.offset.dx * dt
    this.position.y += this.offset.dy * dt
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.sprite?.render(ctx, this)
    if (GAME_OPTIONS.GAME_DEBUG) {
      this.debugDraw(ctx)
    }
  }
}

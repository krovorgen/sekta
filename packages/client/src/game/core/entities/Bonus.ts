import { GAME_OPTIONS } from '../../../constants/game'
import { GAME_RESOURCES } from '../../../constants/resources'
import Entity from '../Entity'
import AnimatedSprite from '../utils/AnimatedSprite'
import Resources from '../utils/Resources'
import { randomElem, randomRange } from '../utils/Calculations'

const { BONUS_WIDTH, BONUS_HEIGHT, BONUS_SPEED, PLAYER_HEIGHT } = GAME_OPTIONS
export enum BonusType {
  IMMUNITY, // бонус иммунитета от огненного дождя
  SLOWDOWN, // бонус замедления скорости игры
}

export default class Bonus extends Entity {
  bonusType: BonusType
  sprite?: AnimatedSprite

  constructor(resources?: Resources) {
    const bonusRange = randomRange(PLAYER_HEIGHT * 0.5, PLAYER_HEIGHT * 1.5)
    super({
      position: {
        x: GAME_OPTIONS.CANVAS_WIDTH,
        y: GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT - bonusRange,
      },
      offset: { dx: -BONUS_SPEED, dy: 0 },
      size: { width: BONUS_WIDTH, height: BONUS_HEIGHT },
    })
    this.bonusType = randomElem([
      BonusType.IMMUNITY,
      BonusType.SLOWDOWN,
    ]) as BonusType
    if (!resources) return
    let resourceSrc = ''
    switch (this.bonusType) {
      case BonusType.IMMUNITY:
        resourceSrc = GAME_RESOURCES.BONUS_IMMUNITY
        break
      case BonusType.SLOWDOWN:
        resourceSrc = GAME_RESOURCES.BONUS_SLOWDOWN
        break
    }
    const spriteImg = resources.get(resourceSrc) as HTMLImageElement
    this.sprite = new AnimatedSprite({
      resource: spriteImg,
      mapPoint: { x: 0, y: 0 },
      frameSize: { height: spriteImg.height, width: spriteImg.height },
      resultSize: { height: BONUS_HEIGHT, width: BONUS_WIDTH },
      speed: 5,
    })
  }

  public isOutside() {
    const rightBorderX = this.sprite?.resultSize.width ?? this.size.width
    return this.position.x + rightBorderX < 0 // правая граница вышла за пределы холста
  }

  public update(dt: number) {
    this.position.x += this.offset.dx * dt
    this.position.y += this.offset.dy * dt
    // воспроизведение анимации
    this.sprite?.update(dt)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.sprite?.render(ctx, this)
    if (GAME_OPTIONS.GAME_DEBUG) {
      this.debugDraw(ctx, 'blue')
    }
  }
}

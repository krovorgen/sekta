import { GAME_OPTIONS } from '../../../constants/game'
import { GAME_RESOURCES } from '../../../constants/resources'
import Entity from '../Entity'
import { TPoint, TSize } from '../utils/Calculations'
import Resources, { TResource } from '../utils/Resources'

const {
  BACKGROUND_LANDSCAPE_SPEED,
  BACKGROUND_ROAD_SPEED,
  BACKGROUND_SKY_SPEED,
} = GAME_OPTIONS
export enum BACKGROUND_TYPE {
  CITY_DAY = 0,
  CITY_NIGHT = 1,
  FOREST_DAY = 2,
  FOREST_NIGHT = 3,
}
class BackgroundComponent {
  position: TPoint
  size: TSize
  img: HTMLImageElement
  speed: number

  constructor(resource: TResource, speed: number) {
    this.img = resource as HTMLImageElement
    this.position = { x: 0, y: 0 }
    this.size = {
      width: GAME_OPTIONS.CANVAS_WIDTH,
      height: GAME_OPTIONS.CANVAS_HEIGHT,
    }
    this.speed = speed
  }
}
export default class Background extends Entity {
  sky?: BackgroundComponent
  road?: BackgroundComponent
  landscape?: BackgroundComponent
  opacity = 1
  fading = false

  constructor(type: BACKGROUND_TYPE, resources?: Resources) {
    super({
      // объект на весь экран
      position: { x: 0, y: 0 },
      offset: { dx: 0, dy: 0 },
      size: {
        width: GAME_OPTIONS.CANVAS_WIDTH,
        height: GAME_OPTIONS.CANVAS_HEIGHT,
      },
    })
    if (!resources) return
    switch (type) {
      case BACKGROUND_TYPE.CITY_DAY:
        this.sky = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_0_SKY),
          BACKGROUND_SKY_SPEED
        )
        this.road = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_0_ROAD),
          BACKGROUND_ROAD_SPEED
        )
        this.landscape = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_0_LANDSCAPE),
          BACKGROUND_LANDSCAPE_SPEED
        )
        break
      case BACKGROUND_TYPE.CITY_NIGHT:
        this.sky = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_1_SKY),
          BACKGROUND_SKY_SPEED
        )
        this.road = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_1_ROAD),
          BACKGROUND_ROAD_SPEED
        )
        this.landscape = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_1_LANDSCAPE),
          BACKGROUND_LANDSCAPE_SPEED
        )
        break
      case BACKGROUND_TYPE.FOREST_DAY:
        this.sky = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_2_SKY),
          BACKGROUND_SKY_SPEED
        )
        this.road = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_2_ROAD),
          BACKGROUND_ROAD_SPEED
        )
        this.landscape = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_2_LANDSCAPE),
          BACKGROUND_LANDSCAPE_SPEED
        )
        break
      case BACKGROUND_TYPE.FOREST_NIGHT:
        this.sky = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_3_SKY),
          BACKGROUND_SKY_SPEED
        )
        this.road = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_3_ROAD),
          BACKGROUND_ROAD_SPEED
        )
        this.landscape = new BackgroundComponent(
          resources.get(GAME_RESOURCES.BACKGROUND_3_LANDSCAPE),
          BACKGROUND_LANDSCAPE_SPEED
        )
        break
    }
  }

  private updateComponent(dt: number, cmp?: BackgroundComponent) {
    if (!cmp) return
    cmp!.position.x -= cmp!.speed * dt
    if (cmp!.position.x <= -(2 * cmp!.size.width)) cmp!.position.x = 0
    // растянуть фон на весь холст игры
    cmp!.size.width = GAME_OPTIONS.CANVAS_WIDTH
    cmp!.size.height = GAME_OPTIONS.CANVAS_HEIGHT
  }
  private drawComponent(
    ctx: CanvasRenderingContext2D,
    cmp?: BackgroundComponent
  ) {
    if (!cmp) return
    // изменить прозрачность
    const globalAlpha = ctx.globalAlpha
    if (this.fading && this.opacity > 0) {
      // эффект исчезания фона
      this.opacity = Math.round(Math.abs(this.opacity - 0.01) * 100) / 100
    }
    ctx.globalAlpha = this.opacity

    // изображени фона 1 (иходное изображение в начале по умолчанию)
    ctx.drawImage(
      cmp.img,
      cmp.position.x,
      cmp.position.y,
      cmp.size.width,
      cmp.size.height
    )

    // изображени фона 2 (следующее изображение с отражением по горизонтали)
    ctx.save()
    ctx.setTransform(-1, 0, 0, 1, cmp.size.width, 0) // отразить отображение по горизонтали
    ctx.drawImage(
      cmp.img,
      -(cmp.position.x + cmp.size.width),
      cmp.position.y,
      cmp.size.width,
      cmp.size.height
    )
    ctx.restore() // вернуть исходное отображение

    // изображение фона 3 (повторение исходного изображения для завершения уходящего фона 2)
    ctx.drawImage(
      cmp.img,
      cmp.position.x + 2 * cmp.size.width,
      cmp.position.y,
      cmp.size.width,
      cmp.size.height
    )

    // восстановить исходную прозрачность
    ctx.globalAlpha = globalAlpha
  }

  public update(dt: number) {
    this.updateComponent(dt, this.sky)
    this.updateComponent(dt, this.landscape)
    this.updateComponent(dt, this.road)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.drawComponent(ctx, this.sky)
    this.drawComponent(ctx, this.landscape)
    this.drawComponent(ctx, this.road)
  }
}

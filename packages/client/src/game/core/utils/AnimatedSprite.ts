import Entity from '../Entity'
import { TPoint, TSize, boxCenter, rangeArray } from './Calculations'
import { TResource } from './Resources'

export enum ANIMATION_DIRECTION {
  HORIZONTAL = 0,
  VERTICAL = 1,
}
type TAnimatedSprite = {
  // основные параметры
  resource: TResource // изображение спрайт-карты
  mapPoint?: TPoint // начальные координаты на спрайт-карте
  mapSize?: TSize // размеры спрайт-карты на изображении
  frameSize?: TSize // размеры одного кадра на спрайт-карте
  resultSize?: TSize // итоговые размеры спрайта
  resultOffset?: TPoint // смещение итогового спрайта
  angle?: number // поворот итогового спрайта
  // параметры анимации
  speed?: number // скорость анимации в фрейм/с
  frames?: number[] // массив кадров в порядке анимации
  direct?: ANIMATION_DIRECTION // тип движения по спрайт-карте
  once?: boolean // проиграть анимацию всего один раз
}
export default class AnimatedSprite {
  // основные параметры
  resource: TResource
  mapPoint: TPoint
  mapSize: TSize
  frameSize: TSize
  resultSize: TSize
  resultOffset: TPoint
  angle: number
  // параметры анимации
  speed?: number
  frames?: number[]
  direct?: ANIMATION_DIRECTION
  once?: boolean

  private _index: number
  private _framePoints: TPoint[]

  // определить координаты точек для каждого кадра на спрайт-карте
  private defineFramePoints(
    mapSize: TSize,
    frameSize: TSize,
    direct?: ANIMATION_DIRECTION
  ): TPoint[] {
    const framePoints: TPoint[] = []
    const frameMatrixSize = this.defineFrameMatrixSize(mapSize, frameSize)
    if (direct == ANIMATION_DIRECTION.HORIZONTAL) {
      // обход матрицы кадров вправо по строкам
      for (let i = 0; i < frameMatrixSize.height; i++) {
        for (let j = 0; j < frameMatrixSize.width; j++) {
          framePoints.push({ x: j * frameSize.width, y: i * frameSize.height })
        }
      }
    } else if (direct == ANIMATION_DIRECTION.VERTICAL) {
      // обход матрицы кадров вниз по столбцам
      for (let j = 0; j < frameMatrixSize.width; j++) {
        for (let i = 0; i < frameMatrixSize.height; i++) {
          framePoints.push({ x: j * frameSize.width, y: i * frameSize.height })
        }
      }
    }
    return framePoints
  }
  // получить размеры матрицы кадров на спрайт-карте
  private defineFrameMatrixSize(mapSize: TSize, frameSize: TSize): TSize {
    return {
      width: Math.floor(mapSize.width / frameSize.width),
      height: Math.floor(mapSize.height / frameSize.height),
    }
  }
  // получить общее кол-во кадров на спрайт-карте
  private maxFrameCount(mapSize: TSize, frameSize: TSize): number {
    const frameMatrixSize = this.defineFrameMatrixSize(mapSize, frameSize)
    return frameMatrixSize.width * frameMatrixSize.height
  }

  constructor(props: TAnimatedSprite) {
    // основные параметры
    const srcImg = props.resource as HTMLImageElement
    this.resource = props.resource
    this.mapPoint = props.mapPoint || { x: 0, y: 0 }
    this.mapSize = props.mapSize || {
      width: srcImg.width,
      height: srcImg.height,
    }
    this.frameSize = props.frameSize || {
      width: srcImg.width,
      height: srcImg.height,
    }
    this.resultSize = props.resultSize || this.frameSize
    this.resultOffset = props.resultOffset || { x: 0, y: 0 }
    this.angle = props.angle || 0
    // параметры анимации
    this.speed = props.speed || 0
    this.frames =
      props.frames ||
      // по умолчанию вся доступная последовательность кадров
      rangeArray(0, this.maxFrameCount(this.mapSize, this.frameSize) - 1)
    this.direct = props.direct || ANIMATION_DIRECTION.HORIZONTAL
    this.once = props.once
    // дополнительно
    this._index = 0
    this._framePoints = this.defineFramePoints(
      this.mapSize,
      this.frameSize,
      this.direct
    )
  }

  public reset(): void {
    this._index = 0
  }

  public update(dt: number): void {
    if (this.speed) {
      this._index += this.speed * dt
    }
  }

  public render(ctx: CanvasRenderingContext2D, entity: Entity): void {
    let frame = 0

    if (this.speed !== undefined && this.frames !== undefined) {
      if (this.speed > 0) {
        const max = this.frames.length
        const idx = Math.floor(this._index)
        frame = this.frames[idx % max] // определить кадр

        if (this.once && idx >= max) {
          return // остановить проигрывание анимации
        }
      }
    }

    // начальная точка на спрайт-карте
    let { x, y } = this.mapPoint
    // рассчитать координаты точки расположения кадра
    const framePoint = this._framePoints[frame]
    if (framePoint) {
      x += framePoint.x
      y += framePoint.y
    }

    // координаты/смещение для размещения/поворота спрайта по центру объекта
    const centerPoint = boxCenter(entity.position, entity.size)
    const centerOffset: TPoint = {
      x: this.resultSize.width / 2,
      y: this.resultSize.height / 2,
    }

    ctx.save() // временное смещение оси координат
    ctx.translate(centerPoint.x, centerPoint.y) // относительно центра объекта
    ctx.rotate((this.angle * Math.PI) / 180) // осуществить поворот оси координат
    ctx.translate(-centerOffset.x, -centerOffset.y) // вернуть в исходную точку

    // размещение спрайта в центре объекта
    ctx.drawImage(
      this.resource as CanvasImageSource,
      x,
      y, // координаты на спрайт-карте для обрезки
      this.frameSize.width,
      this.frameSize.height, // размер для обрезки
      this.resultOffset.x,
      this.resultOffset.y, // смещение для отрисовки обрезанного изображения
      this.resultSize.width,
      this.resultSize.height
    ) // итоговый размер (масштаб)
    ctx.restore() // отменить все изменения оси координат
  }
}

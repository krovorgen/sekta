import { TPoint, TTriangle, triangleContains } from './Calculations'

export enum TOUCH_AREA {
  TOP,
  RIGHT,
  BOTTOM,
  LEFT,
}

export default abstract class TouchControls {
  private static touchAreas: {
    [area: number]: boolean
  } = {}

  private static setArea(
    event: PointerEvent,
    canvas: HTMLElement,
    status: boolean
  ) {
    // разбить холст на 4 треугольных области
    const canvasCenter: TPoint = {
      x: canvas.clientWidth / 2,
      y: canvas.clientHeight / 2,
    }
    const topTriangle: TTriangle = {
      a: { x: canvas.clientWidth, y: 0 },
      b: { x: 0, y: 0 },
      c: canvasCenter,
    }
    const leftTriangle: TTriangle = {
      a: { x: 0, y: 0 },
      b: { x: 0, y: canvas.clientHeight },
      c: canvasCenter,
    }
    const bottomTriangle: TTriangle = {
      a: { x: 0, y: canvas.clientHeight },
      b: { x: canvas.clientWidth, y: canvas.clientHeight },
      c: canvasCenter,
    }
    const rightTriangle: TTriangle = {
      a: { x: canvas.clientWidth, y: 0 },
      b: { x: canvas.clientWidth, y: canvas.clientHeight },
      c: canvasCenter,
    }
    // определить нажатие на треугольную область холста
    const pos: TPoint = { x: event.offsetX, y: event.offsetY }
    let area: TOUCH_AREA | undefined
    if (triangleContains(topTriangle, pos)) {
      area = TOUCH_AREA.TOP
    } else if (triangleContains(leftTriangle, pos)) {
      area = TOUCH_AREA.LEFT
    } else if (triangleContains(bottomTriangle, pos)) {
      area = TOUCH_AREA.BOTTOM
    } else if (triangleContains(rightTriangle, pos)) {
      area = TOUCH_AREA.RIGHT
    }
    if (area === undefined) return
    this.touchAreas[area] = status
  }
  private static handleTouchControls = (event: PointerEvent): void => {
    const target = event.target as HTMLElement
    if (target?.localName != 'canvas') return
    // определение нажатия/снятия ввода
    if (event.type == 'pointerdown') {
      this.setArea(event, target, true)
    } else if (event.type == 'pointerup') {
      this.setArea(event, target, false)
    }
  }
  private static clearTouchAres() {
    this.touchAreas = {}
  }

  public static setControls(): void {
    document.addEventListener('pointerdown', this.handleTouchControls)
    document.addEventListener('pointerup', this.handleTouchControls)
    window.addEventListener('blur', this.clearTouchAres)
  }
  public static clearControls(): void {
    document.removeEventListener('pointerdown', this.handleTouchControls)
    document.removeEventListener('pointerup', this.handleTouchControls)
    window.removeEventListener('blur', this.clearTouchAres)
  }
  public static isTouched(area: TOUCH_AREA): boolean {
    return this.touchAreas[area]
  }
}

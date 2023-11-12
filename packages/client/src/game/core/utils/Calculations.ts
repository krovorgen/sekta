export type TPoint = {
  x: number
  y: number
}

export type TSize = {
  width: number
  height: number
}

export type TOffset = {
  dx: number
  dy: number
}

export type TTriangle = {
  a: TPoint
  b: TPoint
  c: TPoint
}

function collides(
  x: number,
  y: number,
  r: number,
  b: number,
  x2: number,
  y2: number,
  r2: number,
  b2: number
): boolean {
  // принимает координаты верхнего/левого и нижнего/правого углов обоих объектов
  // и проверяет, есть ли какие то пересечения
  return !(r <= x2 || x > r2 || b <= y2 || y > b2)
}

// проверить пересечение двух прямоугольников по их координатам и размерам
export function boxCollides(
  pos: TPoint,
  size: TSize,
  pos2: TPoint,
  size2: TSize
): boolean {
  return collides(
    pos.x,
    pos.y,
    pos.x + size.width,
    pos.y + size.height,
    pos2.x,
    pos2.y,
    pos2.x + size2.width,
    pos2.y + size2.height
  )
}

// найти точку в центре прямоугольника
export function boxCenter(pos: TPoint, size: TSize): TPoint {
  return {
    x: pos.x + size.width / 2,
    y: pos.y + size.height / 2,
  } as TPoint
}

// сгенерировать случайно дробное число в диапазоне [min, max]
export function randomRange(min: number, max: number): number {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.random() * (max - min) + min
}

// получить случайный элемент из массива
export function randomElem(array: Array<unknown>) {
  return array[Math.floor(Math.random() * array.length)]
}

// получить массив из чисел по порядку в диапазоне [min, max]
export function rangeArray(start: number, end: number): number[] {
  const arr: number[] = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}

// получить расстояние между двумя точками
export function distance(src: TPoint, dest: TPoint) {
  return Math.sqrt(Math.pow(dest.x - src.x, 2) + Math.pow(dest.y - src.x, 2))
}

// определить принадлежность точки треугольнику
export function triangleContains({ a, b, c }: TTriangle, pos: TPoint) {
  // проверяет на какой стороне полуплоскости, созданной ребрами, находится точка
  const det = (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y)
  return (
    det * ((b.x - a.x) * (pos.y - a.y) - (b.y - a.y) * (pos.x - a.x)) > 0 &&
    det * ((c.x - b.x) * (pos.y - b.y) - (c.y - b.y) * (pos.x - b.x)) > 0 &&
    det * ((a.x - c.x) * (pos.y - c.y) - (a.y - c.y) * (pos.x - c.x)) > 0
  )
}

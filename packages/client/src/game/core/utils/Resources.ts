import { GAME_RESOURCES, GameResourcesInit } from '../../../constants/game'

export type TResource = HTMLImageElement | boolean

export default class Resources {
  resourceCache: Record<string, TResource>
  readyCallbacks: (() => void)[]

  constructor() {
    this.resourceCache = {}
    this.readyCallbacks = []
    GameResourcesInit()
  }

  private _load(url: string): void {
    if (this.resourceCache[url]) return

    const img = new Image()
    img.onload = () => {
      this.resourceCache[url] = img

      if (this.isReady()) {
        this.readyCallbacks.forEach(func => func())
      }
    }
    img.onerror = () => {
      console.error(`Не удалось загрузить ${url}`)
    }
    this.resourceCache[url] = false
    img.src = url
  }

  // поставить в очередь на загрузку один или несколько ресурсов
  public load(urlOrArr: string | string[]): void {
    if (urlOrArr instanceof Array) {
      urlOrArr.forEach(url => this._load(url))
    } else {
      this._load(urlOrArr)
    }
  }

  // получить успешно загруженный ресурс
  public get(url: string): TResource {
    return this.resourceCache[url]
  }

  // проверить были ли загружены все ресурсы
  public isReady(): boolean {
    let ready = true
    for (const k in this.resourceCache) {
      // если еще хотя бы один ресурс не загружен сбрость флаг готовности
      if (
        Object.prototype.hasOwnProperty.call(this.resourceCache, k) &&
        !this.resourceCache[k]
      ) {
        ready = false
      }
    }
    return ready
  }

  // вызвать событие успешной загрузки всех ресурсов
  public onReady(func: () => void): void {
    this.readyCallbacks.push(func)
  }
}

export const getResourceUrls = (): string[] => {
  return Object.entries(GAME_RESOURCES).map(([, value]) => value)
}

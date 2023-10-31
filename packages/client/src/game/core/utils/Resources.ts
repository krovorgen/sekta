import {
  GAME_RESOURCES,
  GameResourcesInit,
  REGEX_FILE_EXT,
} from '../../../constants/game'

export type TResource = HTMLImageElement | HTMLAudioElement | boolean

export default class Resources {
  resourceCache: Record<string, TResource>
  readyCallbacks: (() => void)[]

  constructor() {
    this.resourceCache = {}
    this.readyCallbacks = []
    GameResourcesInit()
  }

  private _isImage(url: string): boolean {
    return new RegExp(`.(${REGEX_FILE_EXT.IMAGE})$`).test(url)
  }
  private _isSound(url: string): boolean {
    return new RegExp(`.(${REGEX_FILE_EXT.SOUND})$`).test(url)
  }

  private _onLoadHandler(res: TResource, url: string): void {
    if (this.resourceCache[url]) return
    this.resourceCache[url] = res

    if (this.isReady()) {
      this.readyCallbacks.forEach(func => func())
    }
  }

  private _load(url: string): void {
    if (this.resourceCache[url]) return
    // загрузка изображения
    if (this._isImage(url)) {
      const img = new Image()
      img.onload = () => {
        this._onLoadHandler(img, url)
      }
      img.onerror = () => {
        console.error(`Не удалось загрузить изображение ${url}`)
      }
      this.resourceCache[url] = false
      img.src = url
    }
    // загрузка звуковых файлов
    else if (this._isSound(url)) {
      const sound = new Audio()
      sound.oncanplaythrough = () => {
        this._onLoadHandler(sound, url)
      }
      sound.onerror = () => {
        console.error(`Не удалось загрузить звуковой файл ${url}`)
      }
      this.resourceCache[url] = false
      sound.src = url
    }
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

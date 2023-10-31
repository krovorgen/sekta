import { TResource } from './Resources'

type TSound = {
  // основные параметры
  resource: TResource // звуковой файл
  // параметры воспроизведения
  volume?: number // громкость
  lopped?: boolean // повторение
}
export default class Sound {
  private _sound: HTMLAudioElement

  constructor(props: TSound) {
    this._sound = props.resource as HTMLAudioElement
    this._sound.setAttribute('preload', 'auto')
    this._sound.setAttribute('controls', 'none')
    this._sound.style.display = 'none'
    this._sound.volume = props.volume ?? 1.0
    this._sound.loop = props.lopped ?? false
    document?.body.appendChild(this._sound)
  }

  play(): void {
    this._sound.play().catch(error => {
      return
    })
  }

  stop(): void {
    this._sound.pause()
  }

  restart(): void {
    this._sound.currentTime = 0
    this.play()
  }

  playFrom(startTime: number): void {
    this._sound.currentTime = startTime
    this.play()
  }

  playFragment(startTime: number, stopTime: number): void {
    this.playFrom(startTime)

    const handleStop = () => {
      if (this._sound.currentTime > stopTime) {
        if (this._sound.loop) {
          this._sound.currentTime = startTime
        } else {
          this.stop()
          this._sound.removeEventListener('timeupdate', handleStop, false)
        }
      }
    }

    this._sound.addEventListener('timeupdate', handleStop, false)
  }

  setVolume(volume: number): void {
    this._sound.volume = volume
  }

  setCurrentTime(time: number): void {
    this._sound.currentTime = time
  }

  remove(): void {
    document?.body.removeChild(this._sound)
  }
}

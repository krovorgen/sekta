import { TResource } from './Resources'

type TSound = {
  // основные параметры
  resource: TResource // звуковой файл
  // параметры воспроизведения
  volume?: number // громкость
  lopped?: boolean // повторение
}
export default class Sound {
  private _sound?: HTMLAudioElement

  constructor(props: TSound) {
    if (!props.resource) return
    this._sound = props.resource as HTMLAudioElement
    this._sound.setAttribute('preload', 'auto')
    this._sound.setAttribute('controls', 'none')
    this._sound.style.display = 'none'
    this._sound.volume = props.volume ?? 1.0
    this._sound.loop = props.lopped ?? false
    document?.body.appendChild(this._sound)
  }

  play(): void {
    this._sound?.play().catch(error => {
      console.log('Ошибка воспроизведения звукового файла (окно не активно)')
    })
  }

  stop(): void {
    this._sound?.pause()
  }

  restart(): void {
    if (!this._sound) return
    this._sound.currentTime = 0
    this.play()
  }

  playFrom(startTime: number): void {
    if (!this._sound) return
    this._sound.currentTime = startTime
    this.play()
  }

  playFragment(startTime: number, stopTime: number): void {
    this.playFrom(startTime)

    const handleStop = () => {
      if (!this._sound) return
      if (this._sound.currentTime > stopTime) {
        if (this._sound.loop) {
          this._sound.currentTime = startTime
        } else {
          this.stop()
          this._sound.removeEventListener('timeupdate', handleStop, false)
        }
      }
    }

    this._sound?.addEventListener('timeupdate', handleStop, false)
  }

  setVolume(volume: number): void {
    if (!this._sound) return
    this._sound.volume = volume
  }

  setCurrentTime(time: number): void {
    if (!this._sound) return
    this._sound.currentTime = time
  }

  remove(): void {
    if (!this._sound) return
    document?.body.removeChild(this._sound)
  }
}

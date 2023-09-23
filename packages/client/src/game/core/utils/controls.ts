export enum KEYS {
  SPACE = 'SPACE',
  LEFT = 'LEFT',
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
}

export default abstract class KeyControls {
  private static pressedKeys: {
    [key: string]: boolean
  } = {}

  private static setKey(event: KeyboardEvent, status: boolean) {
    const code = event.keyCode
    let key
    switch (code) {
      case 32:
        key = KEYS.SPACE
        break
      case 37:
        key = KEYS.LEFT
        break
      case 38:
        key = KEYS.UP
        break
      case 39:
        key = KEYS.RIGHT
        break
      case 40:
        key = KEYS.DOWN
        break
      default:
        // конвертировать ASCII-коды в буквы
        key = String.fromCharCode(code)
    }
    this.pressedKeys[key] = status
  }

  private static handleKeyControls = (event: KeyboardEvent): void => {
    if (event.type == 'keydown') {
      this.setKey(event, true)
    } else if (event.type == 'keyup') {
      this.setKey(event, false)
    }
  }
  private static clearProcessedKeys() {
    this.pressedKeys = {}
  }

  public static setControls(): void {
    document.addEventListener('keydown', this.handleKeyControls)
    document.addEventListener('keyup', this.handleKeyControls)
    window.addEventListener('blur', this.clearProcessedKeys)
  }
  public static clearControls(): void {
    document.removeEventListener('keydown', this.handleKeyControls)
    document.removeEventListener('keyup', this.handleKeyControls)
    window.removeEventListener('blur', this.clearProcessedKeys)
  }
  public static isKeyDown(key: KEYS): boolean {
    return this.pressedKeys[key.toUpperCase()]
  }
}

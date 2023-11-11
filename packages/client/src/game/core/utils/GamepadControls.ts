export enum GAMEPAD_ACT {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}
enum GAMEPAD_BUTTONS {
  IDX_L1 = 4,
  IDX_R1 = 5,
  IDX_L2 = 6,
  IDX_R2 = 7,
  IDX_LSTICK = 10,
  IDX_RSTICK = 11,
  IDX_UP = 12,
  IDX_DOWN = 13,
  IDX_LEFT = 14,
  IDX_RIGHT = 15,
}
enum GAMEPAD_AXES {
  IDX_LSTICK_X = 0,
  IDX_LSTICK_Y = 1,
  IDX_RSTICK_X = 2,
  IDX_RSTICK_Y = 3,
}

export default abstract class GamepadControls {
  private static connectedGamepads: Record<string, Gamepad>
  private static gamepadActs: {
    [act: number]: boolean
  } = {}

  private static setAct(act: GAMEPAD_ACT, status: boolean) {
    this.gamepadActs[act] = status
  }
  private static handleGamepadConnected = (event: GamepadEvent): void => {
    this.connectedGamepads[event.gamepad.id] = event.gamepad
  }
  private static clearGamepadActs() {
    this.gamepadActs = {}
  }

  public static updateControls(): void {
    if (!navigator.getGamepads) return
    this.clearGamepadActs() // сбросить все нажатия
    for (const gamepad of navigator.getGamepads()) {
      if (!gamepad) continue
      // выполнить анализ нажатий повторно
      const buttons = gamepad.buttons
      const axes = gamepad.axes
      const axeThreshold = 0.1 // порог срабатывания стика
      if (
        buttons[GAMEPAD_BUTTONS.IDX_UP].pressed ||
        buttons[GAMEPAD_BUTTONS.IDX_L1].pressed ||
        buttons[GAMEPAD_BUTTONS.IDX_R1].pressed ||
        buttons[GAMEPAD_BUTTONS.IDX_L2].pressed ||
        buttons[GAMEPAD_BUTTONS.IDX_R2].pressed ||
        buttons[GAMEPAD_BUTTONS.IDX_LSTICK].pressed ||
        buttons[GAMEPAD_BUTTONS.IDX_RSTICK].pressed ||
        axes[GAMEPAD_AXES.IDX_LSTICK_Y] < -axeThreshold
      ) {
        this.setAct(GAMEPAD_ACT.UP, true)
      }
      if (
        buttons[GAMEPAD_BUTTONS.IDX_DOWN].pressed ||
        axes[GAMEPAD_AXES.IDX_LSTICK_Y] > axeThreshold
      ) {
        this.setAct(GAMEPAD_ACT.DOWN, true)
      }
      if (
        buttons[GAMEPAD_BUTTONS.IDX_LEFT].pressed ||
        axes[GAMEPAD_AXES.IDX_LSTICK_X] < -axeThreshold
      ) {
        this.setAct(GAMEPAD_ACT.LEFT, true)
      }
      if (
        buttons[GAMEPAD_BUTTONS.IDX_RIGHT].pressed ||
        axes[GAMEPAD_AXES.IDX_LSTICK_X] > axeThreshold
      ) {
        this.setAct(GAMEPAD_ACT.RIGHT, true)
      }
    }
  }
  public static setControls(): void {
    this.connectedGamepads = {}
    window.addEventListener('gamepadconnected', this.handleGamepadConnected)
    window.addEventListener('blur', this.clearGamepadActs)
  }
  public static clearControls(): void {
    this.connectedGamepads = {}
    window.removeEventListener('gamepadconnected', this.handleGamepadConnected)
    window.removeEventListener('blur', this.clearGamepadActs)
  }
  public static isAct(act: GAMEPAD_ACT): boolean {
    return this.gamepadActs[act]
  }
}

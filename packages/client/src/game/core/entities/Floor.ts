import { GAME_OPTIONS } from '../../../constants/game'
import Block from '../Block'

export default class Floor extends Block {
  constructor() {
    super({
      position: {
        x: 0,
        y: GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT,
      },
      offset: { dx: 0, dy: 0 },
      size: {
        width: GAME_OPTIONS.CANVAS_WIDTH,
        height: GAME_OPTIONS.FLOOR_HEIGHT,
      },
    })
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (GAME_OPTIONS.GAME_DEBUG) {
      this.debugDraw(ctx)
    }
  }
}

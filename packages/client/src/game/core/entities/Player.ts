import { GAME_OPTIONS } from '../../../constants/game'
import { GAME_RESOURCES } from '../../../constants/resources'
import Entity from '../Entity'
import AnimatedSprite from '../utils/AnimatedSprite'
import Resources from '../utils/Resources'
import Sound from '../utils/Sound'

const {
  PLAYER_WIDTH,
  PLAYER_HEIGHT,
  PLAYER_SPEED,
  PLAYER_LEFT_OFFSET,
  PLAYER_JUMP_MULTIPLIER,
  PLAYER_JUMP_DURATION,
  PLAYER_JUMP_BLOCKTIME,
} = GAME_OPTIONS

export default class Player extends Entity {
  isDead = false
  isJump = false
  lastJump = 0
  moveSpeed = PLAYER_SPEED

  sprite?: AnimatedSprite
  run_sound?: Sound
  jump_sound?: Sound
  resources?: Resources

  constructor(resources?: Resources) {
    super({
      position: {
        x: PLAYER_LEFT_OFFSET,
        y:
          GAME_OPTIONS.CANVAS_HEIGHT -
          GAME_OPTIONS.FLOOR_HEIGHT -
          PLAYER_HEIGHT,
      },
      offset: { dx: 0, dy: 0 },
      size: { width: PLAYER_WIDTH, height: PLAYER_HEIGHT },
    })
    if (!resources) return
    this.resources = resources
    this.sprite = this.spriteRun()
    this.jump_sound = new Sound({
      resource: this.resources.get(GAME_RESOURCES.PLAYER_JUMP_SOUND),
    })
    this.run_sound = new Sound({
      resource: this.resources.get(GAME_RESOURCES.PLAYER_RUN_SOUND),
      lopped: true,
    })
    this.run_sound.play()
  }

  private spriteRun(): AnimatedSprite | undefined {
    if (!this.resources) return
    return new AnimatedSprite({
      resource: this.resources.get(GAME_RESOURCES.PLAYER_RUN),
      mapPoint: { x: 0, y: 0 },
      frameSize: { height: 100, width: 100 },
      resultSize: { height: 100, width: 100 },
      speed: 25,
    })
  }
  private spriteJump(): AnimatedSprite | undefined {
    if (!this.resources) return
    return new AnimatedSprite({
      resource: this.resources.get(GAME_RESOURCES.PLAYER_JUMP),
      mapPoint: { x: 0, y: 0 },
      frameSize: { height: 200, width: 100 },
      resultSize: { height: 150, width: 80 },
      frames: [
        0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3,
        2, 1, 0,
      ],
      speed: 25,
      once: true,
    })
  }

  public jump() {
    if (
      !this.isJump && // блокировка частого прыжка
      Date.now() - this.lastJump > PLAYER_JUMP_BLOCKTIME
    ) {
      this.isJump = true
      this.lastJump = Date.now()
      this.sprite = this.spriteJump()
      this.run_sound?.stop()
      this.jump_sound?.restart()
    }
  }
  public down() {
    this.offset.dy += this.moveSpeed
  }
  public left() {
    this.offset.dx -= this.moveSpeed
  }
  public right() {
    this.offset.dx += this.moveSpeed
  }

  public update(dt: number) {
    // прыжок игрока
    if (
      this.isJump && // длительность прыжка
      Date.now() - this.lastJump < PLAYER_JUMP_DURATION
    ) {
      this.offset.dy -= GAME_OPTIONS.GRAVITY_VALUE * PLAYER_JUMP_MULTIPLIER * dt
    }
    // гравитация игрока
    this.offset.dy += GAME_OPTIONS.GRAVITY_VALUE * dt
    // сила трения
    this.offset.dx -= this.offset.dx * GAME_OPTIONS.FRICTION_FORCE
    // движение игрока
    this.position.x += this.offset.dx * dt
    this.position.y += this.offset.dy
    // органичение зоны движения игрока
    if (this.position.x + this.size.width > GAME_OPTIONS.CANVAS_WIDTH) {
      this.position.x = GAME_OPTIONS.CANVAS_WIDTH - this.size.width
      this.offset.dx = 0
    }
    if (this.position.x < 0) {
      this.position.x = 0
      this.offset.dx = 0
    }
    if (
      this.position.y + this.size.height >
      GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT + 1
    ) {
      this.position.y =
        GAME_OPTIONS.CANVAS_HEIGHT -
        GAME_OPTIONS.FLOOR_HEIGHT -
        this.size.height
      this.offset.dy = 0
      if (this.isJump) {
        this.isJump = false
        this.sprite = this.spriteRun()
        this.run_sound?.restart()
      }
    }
    if (this.position.y < 0) {
      this.position.y = 0
      this.offset.dy = 0
    }

    // воспроизведение анимации
    this.sprite?.update(dt)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (this.sprite) {
      this.sprite.render(ctx, this)
    } else {
      ctx.beginPath()
      ctx.rect(
        this.position.x,
        this.position.y,
        this.size.width,
        this.size.height
      )
      ctx.fillStyle = this.isDead ? 'red' : 'green'
      ctx.fill()
      ctx.closePath()
    }
  }
}

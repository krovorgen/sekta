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
  PLAYER_SLIDE_MULTIPLIER,
  PLAYER_SLIDE_DURATION,
  PLAYER_SLIDE_BLOCKTIME,
} = GAME_OPTIONS

export default class Player extends Entity {
  isDead = false
  isJumping = false
  lastJump = 0
  isSliding = false
  lastSlide = 0
  moveSpeed = PLAYER_SPEED

  sprite?: AnimatedSprite
  run_sound?: Sound
  jump_sound?: Sound
  slide_sound?: Sound
  death_sound?: Sound
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
    this.slide_sound = new Sound({
      resource: this.resources.get(GAME_RESOURCES.PLAYER_SLIDE_SOUND),
    })
    this.run_sound = new Sound({
      resource: this.resources.get(GAME_RESOURCES.PLAYER_RUN_SOUND),
      lopped: true,
    })
    this.death_sound = new Sound({
      resource: this.resources.get(GAME_RESOURCES.PLAYER_DEATH_SOUND),
      volume: GAME_OPTIONS.BACKGROUND_SOUND_VOLUME,
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
      resultOffset: { x: 0, y: 25 },
      frames: [
        0, 1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3,
        2, 1, 0,
      ],
      speed: 25,
      once: true,
    })
  }
  private spriteSlide(): AnimatedSprite | undefined {
    if (!this.resources) return
    return new AnimatedSprite({
      resource: this.resources.get(GAME_RESOURCES.PLAYER_SLIDE),
      mapPoint: { x: 0, y: 0 },
      frameSize: { height: 100, width: 100 },
      resultSize: { height: 100, width: 100 },
      resultOffset: { x: 0, y: -25 },
      speed: 25,
      once: true,
    })
  }

  public jump() {
    if (
      !this.isJumping && // блокировка частого использования
      this.jumpDeltaTime() > PLAYER_JUMP_BLOCKTIME &&
      !this.isSliding // блокировка прыжка при проскальзывании
    ) {
      this.isJumping = true
      this.lastJump = Date.now()
      this.size.height = PLAYER_HEIGHT / 2 // уменьшить размер игрока
      this.sprite = this.spriteJump()
      this.run_sound?.stop()
      this.jump_sound?.restart()
    }
  }
  public jumpDeltaTime() {
    return Date.now() - this.lastJump
  }
  private jumpEnd() {
    if (this.isJumping) {
      this.isJumping = false
      this.size.height = PLAYER_HEIGHT // вернуть размер игрока
      this.sprite = this.spriteRun()
      this.run_sound?.restart()
    }
  }
  public slide(fastDownCallback: (player: Player) => void) {
    if (this.isJumping) {
      // быстрое падение на землю с прыжка
      this.offset.dy += this.moveSpeed
      fastDownCallback(this)
    } else if (
      // блокировка проскальзывания при прыжке
      !this.isSliding && // блокировка частого использования
      this.slideDeltaTime() > PLAYER_SLIDE_BLOCKTIME
    ) {
      this.isSliding = true
      this.lastSlide = Date.now()
      this.size.height = PLAYER_HEIGHT / 2 // уменьшить размер игрока
      this.sprite = this.spriteSlide()
      this.run_sound?.stop()
      this.slide_sound?.restart()
    }
  }
  public slideDeltaTime() {
    return Date.now() - this.lastSlide
  }
  private slideEnd() {
    if (this.isSliding) {
      this.isSliding = false
      this.size.height = PLAYER_HEIGHT // вернуть размер игрока
      this.sprite = this.spriteRun()
      this.run_sound?.restart()
    }
  }
  public left() {
    this.offset.dx -= this.moveSpeed * 2
  }
  public right() {
    this.offset.dx += this.moveSpeed
  }
  public death() {
    this.isDead = true
    this.death_sound?.restart()
  }

  public update(dt: number) {
    // прыжок игрока
    if (
      this.isJumping && // длительность прыжка
      Date.now() - this.lastJump < PLAYER_JUMP_DURATION
    ) {
      this.offset.dy -= GAME_OPTIONS.GRAVITY_VALUE * PLAYER_JUMP_MULTIPLIER * dt
    }
    // проскальзывание игрока
    if (
      this.isSliding && // длительность проскальзывания
      Date.now() - this.lastSlide < PLAYER_SLIDE_DURATION
    ) {
      this.offset.dx += PLAYER_SPEED * PLAYER_SLIDE_MULTIPLIER
    } else {
      this.slideEnd()
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
      this.position.y + this.size.height > // столкновение с землей
      GAME_OPTIONS.CANVAS_HEIGHT - GAME_OPTIONS.FLOOR_HEIGHT + 1
    ) {
      this.jumpEnd()
      this.position.y =
        GAME_OPTIONS.CANVAS_HEIGHT -
        GAME_OPTIONS.FLOOR_HEIGHT -
        this.size.height
      this.offset.dy = 0
    }
    if (this.position.y < 0) {
      this.position.y = 0
      this.offset.dy = 0
    }

    // воспроизведение анимации
    this.sprite?.update(dt)
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this.sprite?.render(ctx, this)
    if (GAME_OPTIONS.GAME_DEBUG) {
      this.debugDraw(ctx, this.isDead ? 'red' : 'green')
    }
  }
}

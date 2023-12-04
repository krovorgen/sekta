export enum REGEX_FILE_EXT {
  IMAGE = 'png',
  SOUND = 'mp3',
}
export const GAME_RESOURCES = {
  /*
   * Изображения
   */
  // персонаж
  PLAYER_IDLE: '',
  PLAYER_JUMP: '',
  PLAYER_RUN: '',
  PLAYER_SLIDE: '',
  PLAYER_WALK: '',
  // огненный дождь
  FIREBALL: '',
  // ловушки
  SPEARS: '',
  SPEARS_2: '',
  SPEARS_3: '',
  SPEARS_4: '',
  TRAP: '',
  TRAP_2: '',
  // бонусы
  BONUS_SLOWDOWN: '',
  BONUS_IMMUNITY: '',
  BONUS_SCORE: '',
  // фон
  BACKGROUND_0_LANDSCAPE: '',
  BACKGROUND_0_ROAD: '',
  BACKGROUND_0_SKY: '',
  BACKGROUND_1_LANDSCAPE: '',
  BACKGROUND_1_ROAD: '',
  BACKGROUND_1_SKY: '',
  BACKGROUND_2_LANDSCAPE: '',
  BACKGROUND_2_ROAD: '',
  BACKGROUND_2_SKY: '',
  BACKGROUND_3_LANDSCAPE: '',
  BACKGROUND_3_ROAD: '',
  BACKGROUND_3_SKY: '',
  /*
   * Звуковое сопровождение
   */
  BACKGROUND_SOUND: '',
  PLAYER_RUN_SOUND: '',
  PLAYER_JUMP_SOUND: '',
  PLAYER_SLIDE_SOUND: '',
  PLAYER_DEATH_SOUND: '',
}
// настройки ресурсов
export function GameResourcesInit() {
  /*
   * Изображения
   */
  // персонаж
  GAME_RESOURCES.PLAYER_IDLE = PLAYER_IDLE_PATH
  GAME_RESOURCES.PLAYER_JUMP = PLAYER_JUMP_PATH
  GAME_RESOURCES.PLAYER_RUN = PLAYER_RUN_PATH
  GAME_RESOURCES.PLAYER_SLIDE = PLAYER_SLIDE_PATH
  GAME_RESOURCES.PLAYER_WALK = PLAYER_WALK_PATH
  // огненный дождь
  GAME_RESOURCES.FIREBALL = FIREBALL_PATH
  // ловушки
  GAME_RESOURCES.SPEARS = SPEARS_PATH
  GAME_RESOURCES.SPEARS_2 = SPEARS_2_PATH
  GAME_RESOURCES.SPEARS_3 = SPEARS_3_PATH
  GAME_RESOURCES.SPEARS_4 = SPEARS_4_PATH
  GAME_RESOURCES.TRAP = TRAP_PATH
  GAME_RESOURCES.TRAP_2 = TRAP_2_PATH
  // бонусы
  GAME_RESOURCES.BONUS_SLOWDOWN = BONUS_SLOWDOWN_PATH
  GAME_RESOURCES.BONUS_IMMUNITY = BONUS_IMMUNITY_PATH
  GAME_RESOURCES.BONUS_SCORE = BONUS_SCORE_PATH
  // фон
  GAME_RESOURCES.BACKGROUND_0_LANDSCAPE = BACKGROUND_0_LANDSCAPE_PATH
  GAME_RESOURCES.BACKGROUND_0_ROAD = BACKGROUND_0_ROAD_PATH
  GAME_RESOURCES.BACKGROUND_0_SKY = BACKGROUND_0_SKY_PATH
  GAME_RESOURCES.BACKGROUND_1_LANDSCAPE = BACKGROUND_1_LANDSCAPE_PATH
  GAME_RESOURCES.BACKGROUND_1_ROAD = BACKGROUND_1_ROAD_PATH
  GAME_RESOURCES.BACKGROUND_1_SKY = BACKGROUND_1_SKY_PATH
  GAME_RESOURCES.BACKGROUND_2_LANDSCAPE = BACKGROUND_2_LANDSCAPE_PATH
  GAME_RESOURCES.BACKGROUND_2_ROAD = BACKGROUND_2_ROAD_PATH
  GAME_RESOURCES.BACKGROUND_2_SKY = BACKGROUND_2_SKY_PATH
  GAME_RESOURCES.BACKGROUND_3_LANDSCAPE = BACKGROUND_3_LANDSCAPE_PATH
  GAME_RESOURCES.BACKGROUND_3_ROAD = BACKGROUND_3_ROAD_PATH
  GAME_RESOURCES.BACKGROUND_3_SKY = BACKGROUND_3_SKY_PATH
  /*
   * Звуковое сопровождение
   */
  GAME_RESOURCES.BACKGROUND_SOUND = BACKGROUND_SOUND_PATH
  GAME_RESOURCES.PLAYER_RUN_SOUND = PLAYER_RUN_SOUND_PATH
  GAME_RESOURCES.PLAYER_JUMP_SOUND = PLAYER_JUMP_SOUND_PATH
  GAME_RESOURCES.PLAYER_SLIDE_SOUND = PLAYER_SLIDE_SOUND_PATH
  GAME_RESOURCES.PLAYER_DEATH_SOUND = PLAYER_DEATH_SOUND_PATH
}
/*
 * Изображения
 */
// персонаж
import PLAYER_IDLE_PATH from '../assets/sprites/player/idle.png'
import PLAYER_JUMP_PATH from '../assets/sprites/player/jump.png'
import PLAYER_RUN_PATH from '../assets/sprites/player/run.png'
import PLAYER_SLIDE_PATH from '../assets/sprites/player/slide.png'
import PLAYER_WALK_PATH from '../assets/sprites/player/walk.png'
// огненный дождь
import FIREBALL_PATH from '../assets/sprites/entities/fireballs/fireball.png'
// ловушки
import SPEARS_PATH from '../assets/sprites/entities/traps/spears.png'
import SPEARS_2_PATH from '../assets/sprites/entities/traps/spears_2.png'
import SPEARS_3_PATH from '../assets/sprites/entities/traps/spears_3.png'
import SPEARS_4_PATH from '../assets/sprites/entities/traps/spears_4.png'
import TRAP_PATH from '../assets/sprites/entities/traps/trap.png'
import TRAP_2_PATH from '../assets/sprites/entities/traps/trap_2.png'
// бонусы
import BONUS_SLOWDOWN_PATH from '../assets/sprites/entities/gems/gem_yellow.png'
import BONUS_IMMUNITY_PATH from '../assets/sprites/entities/gems/gem_blue.png'
import BONUS_SCORE_PATH from '../assets/sprites/entities/gems/coin_gold.png'
// фон
import BACKGROUND_0_LANDSCAPE_PATH from '../assets/sprites/background/city_day/landscape.png'
import BACKGROUND_0_ROAD_PATH from '../assets/sprites/background/city_day/road.png'
import BACKGROUND_0_SKY_PATH from '../assets/sprites/background/city_day/sky.png'
import BACKGROUND_1_LANDSCAPE_PATH from '../assets/sprites/background/city_night/landscape.png'
import BACKGROUND_1_ROAD_PATH from '../assets/sprites/background/city_night/road.png'
import BACKGROUND_1_SKY_PATH from '../assets/sprites/background/city_night/sky.png'
import BACKGROUND_2_LANDSCAPE_PATH from '../assets/sprites/background/forest_day/landscape.png'
import BACKGROUND_2_ROAD_PATH from '../assets/sprites/background/forest_day/road.png'
import BACKGROUND_2_SKY_PATH from '../assets/sprites/background/forest_day/sky.png'
import BACKGROUND_3_LANDSCAPE_PATH from '../assets/sprites/background/forest_night/landscape.png'
import BACKGROUND_3_ROAD_PATH from '../assets/sprites/background/forest_night/road.png'
import BACKGROUND_3_SKY_PATH from '../assets/sprites/background/forest_night/sky.png'
/*
 * Звуковое сопровождение
 */
import BACKGROUND_SOUND_PATH from '../assets/sounds/background.mp3'
import PLAYER_RUN_SOUND_PATH from '../assets/sounds/run.mp3'
import PLAYER_JUMP_SOUND_PATH from '../assets/sounds/jump.mp3'
import PLAYER_SLIDE_SOUND_PATH from '../assets/sounds/slide.mp3'
import PLAYER_DEATH_SOUND_PATH from '../assets/sounds/death.mp3'

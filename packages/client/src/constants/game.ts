export const GAME_OPTIONS = {
  // настройки отображения
  GAME_MIN_FPS: 25,
  CANVAS_WIDTH: 1280,
  CANVAS_HEIGHT: 720,
  FLOOR_HEIGHT: 75,
  // настройки физики игры
  GRAVITY_VALUE: 30,
  FRICTION_FORCE: 0.05,
  SPEED_STEP: 0.02,
  // настройки персонажа
  PLAYER_WIDTH: 50,
  PLAYER_HEIGHT: 100,
  PLAYER_SPEED: 5,
  PLAYER_LEFT_OFFSET: 50,
  PLAYER_JUMP_MULTIPLIER: 2.5,
  PLAYER_JUMP_DURATION: 200,
  PLAYER_JUMP_BLOCKTIME: 1500,
  // настройки препятствий
  BRICK_WIDTH: 20,
  BRICK_HEIGHT: 20,
  BRICK_SPEED: 200,
  BRICK_TIME: 3000,
  // настройки огненного дождя
  FIREBALL_WIDTH: 20,
  FIREBALL_HEIGHT: 20,
  FIREBALL_SPEED_MIN: 100,
  FIREBALL_SPEED_MAX: 105,
  // настройки фона игры
  BACKGROUND_LANDSCAPE_SPEED: 75,
  BACKGROUND_ROAD_SPEED: 100,
  BACKGROUND_SKY_SPEED: 50,
  BACKGROUND_TIME: 20000,
}

export enum REGEX_FILE_EXT {
  IMAGE = 'png',
  SOUND = 'mp3',
}
export const GAME_RESOURCES = {
  // изображения
  PLAYER_IDLE: '',
  PLAYER_JUMP: '',
  PLAYER_RUN: '',
  PLAYER_SLIDE: '',
  PLAYER_WALK: '',
  FIREBALL: '',
  BONFIRE: '',
  SPEARS: '',
  WALL: '',
  VAPOR: '',
  BONUS_SLOWING: '',
  BONUS_IMMUNITY: '',
  BONUS_SCORE: '',
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
  // звуковое сопровождение
  BACKGROUND_SOUND: '',
  PLAYER_RUN_SOUND: '',
  PLAYER_JUMP_SOUND: '',
  PLAYER_SLIDE_SOUND: '',
}
export function GameResourcesInit() {
  // настройки ресурсов
  // изображения
  GAME_RESOURCES.PLAYER_IDLE = PLAYER_IDLE_PATH
  GAME_RESOURCES.PLAYER_JUMP = PLAYER_JUMP_PATH
  GAME_RESOURCES.PLAYER_RUN = PLAYER_RUN_PATH
  GAME_RESOURCES.PLAYER_SLIDE = PLAYER_SLIDE_PATH
  GAME_RESOURCES.PLAYER_WALK = PLAYER_WALK_PATH
  GAME_RESOURCES.FIREBALL = FIREBALL_PATH
  GAME_RESOURCES.BONFIRE = BONFIRE_PATH
  GAME_RESOURCES.SPEARS = SPEARS_PATH
  GAME_RESOURCES.WALL = WALL_PATH
  GAME_RESOURCES.VAPOR = VAPOR_PATH
  GAME_RESOURCES.BONUS_SLOWING = BONUS_SLOWING_PATH
  GAME_RESOURCES.BONUS_IMMUNITY = BONUS_IMMUNITY_PATH
  GAME_RESOURCES.BONUS_SCORE = BONUS_SCORE_PATH
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
  // звуковое сопровождение
  GAME_RESOURCES.BACKGROUND_SOUND = BACKGROUND_SOUND_PATH
  GAME_RESOURCES.PLAYER_RUN_SOUND = PLAYER_RUN_SOUND_PATH
  GAME_RESOURCES.PLAYER_JUMP_SOUND = PLAYER_JUMP_SOUND_PATH
  GAME_RESOURCES.PLAYER_SLIDE_SOUND = PLAYER_SLIDE_SOUND_PATH
}
// изображения
import PLAYER_IDLE_PATH from '../assets/sprites/player/idle.png'
import PLAYER_JUMP_PATH from '../assets/sprites/player/jump.png'
import PLAYER_RUN_PATH from '../assets/sprites/player/run.png'
import PLAYER_SLIDE_PATH from '../assets/sprites/player/slide.png'
import PLAYER_WALK_PATH from '../assets/sprites/player/walk.png'
import FIREBALL_PATH from '../assets/sprites/entities/fireball.png'
import BONFIRE_PATH from '../assets/sprites/entities/bonfire.png'
import SPEARS_PATH from '../assets/sprites/entities/spears.png'
import WALL_PATH from '../assets/sprites/entities/wall.png'
import VAPOR_PATH from '../assets/sprites/entities/vapor.png'
import BONUS_SLOWING_PATH from '../assets/sprites/entities/gems/gem_blue.png'
import BONUS_IMMUNITY_PATH from '../assets/sprites/entities/gems/gem_red.png'
import BONUS_SCORE_PATH from '../assets/sprites/entities/gems/coin_gold.png'
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
// звуковое сопровождение
import BACKGROUND_SOUND_PATH from '../assets/sounds/background.mp3'
import PLAYER_RUN_SOUND_PATH from '../assets/sounds/run.mp3'
import PLAYER_JUMP_SOUND_PATH from '../assets/sounds/jump.mp3'
import PLAYER_SLIDE_SOUND_PATH from '../assets/sounds/slide.mp3'

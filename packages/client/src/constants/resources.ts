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
  // препятствия
  WALL: '',
  CLIFF: '',
  BARRICADE: '',
  BARRICADE_2: '',
  PILLAR: '',
  RUIN: '',
  STONE: '',
  TIMBER: '',
  CAR_SUV: '',
  CAR_TOPLESS: '',
  ICE_CREAM_VAN: '',
  SWAT_VAN: '',
  DOG_VAN: '',
  HAMMER: '',
  MUSTANG: '',
  SCHOOL_BUS: '',
  // эффекты
  BONFIRE: '',
  VAPOR: '',
  // декорации
  FENCE: '',
  RUINS: '',
  RUINS_SET: '',
  // бонусы
  BONUS_SLOWING: '',
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
  // препятствия
  GAME_RESOURCES.WALL = WALL_PATH
  GAME_RESOURCES.CLIFF = CLIFF_PATH
  GAME_RESOURCES.BARRICADE = BARRICADE_PATH
  GAME_RESOURCES.BARRICADE_2 = BARRICADE_2_PATH
  GAME_RESOURCES.PILLAR = PILLAR_PATH
  GAME_RESOURCES.RUIN = RUIN_PATH
  GAME_RESOURCES.STONE = STONE_PATH
  GAME_RESOURCES.TIMBER = TIMBER_PATH
  GAME_RESOURCES.CAR_SUV = CAR_SUV_PATH
  GAME_RESOURCES.CAR_TOPLESS = CAR_TOPLESS_PATH
  GAME_RESOURCES.ICE_CREAM_VAN = ICE_CREAM_VAN_PATH
  GAME_RESOURCES.SWAT_VAN = SWAT_VAN_PATH
  GAME_RESOURCES.DOG_VAN = DOG_VAN_PATH
  GAME_RESOURCES.HAMMER = HAMMER_PATH
  GAME_RESOURCES.MUSTANG = MUSTANG_PATH
  GAME_RESOURCES.SCHOOL_BUS = SCHOOL_BUS_PATH
  // эффекты
  GAME_RESOURCES.BONFIRE = BONFIRE_PATH
  GAME_RESOURCES.VAPOR = VAPOR_PATH
  // декорации
  GAME_RESOURCES.FENCE = FENCE_PATH
  GAME_RESOURCES.RUINS = RUINS_PATH
  GAME_RESOURCES.RUINS_SET = RUINS_SET_PATH
  // бонусы
  GAME_RESOURCES.BONUS_SLOWING = BONUS_SLOWING_PATH
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
// препятствия
import WALL_PATH from '../assets/sprites/entities/barriers/wall.png'
import CLIFF_PATH from '../assets/sprites/entities/barriers/cliff.png'
import BARRICADE_PATH from '../assets/sprites/entities/barriers/barricade.png'
import BARRICADE_2_PATH from '../assets/sprites/entities/barriers/barricade_2.png'
import PILLAR_PATH from '../assets/sprites/entities/barriers/pillar.png'
import RUIN_PATH from '../assets/sprites/entities/barriers/ruin.png'
import STONE_PATH from '../assets/sprites/entities/barriers/stone.png'
import TIMBER_PATH from '../assets/sprites/entities/barriers/timber.png'
import CAR_SUV_PATH from '../assets/sprites/entities/barriers/cars/car-suv.png'
import CAR_TOPLESS_PATH from '../assets/sprites/entities/barriers/cars/car-topless.png'
import ICE_CREAM_VAN_PATH from '../assets/sprites/entities/barriers/cars/ice-cream-van.png'
import SWAT_VAN_PATH from '../assets/sprites/entities/barriers/cars/swat-van.png'
import DOG_VAN_PATH from '../assets/sprites/entities/barriers/cars/dog-van.png'
import HAMMER_PATH from '../assets/sprites/entities/barriers/cars/hammer.png'
import MUSTANG_PATH from '../assets/sprites/entities/barriers/cars/mustang.png'
import SCHOOL_BUS_PATH from '../assets/sprites/entities/barriers/cars/school-bus.png'
// эффекты
import BONFIRE_PATH from '../assets/sprites/entities/effects/bonfire.png'
import VAPOR_PATH from '../assets/sprites/entities/effects/vapor.png'
// декорации
import FENCE_PATH from '../assets/sprites/entities/decorations/fence.png'
import RUINS_PATH from '../assets/sprites/entities/decorations/ruins.png'
import RUINS_SET_PATH from '../assets/sprites/entities/decorations/ruins_set.png'
// бонусы
import BONUS_SLOWING_PATH from '../assets/sprites/entities/gems/gem_blue.png'
import BONUS_IMMUNITY_PATH from '../assets/sprites/entities/gems/gem_red.png'
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

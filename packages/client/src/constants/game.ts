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
  BRICK_WIDTH: 50,
  BRICK_HEIGHT: 50,
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

export const GAME_RESOURCES = {
  // настройки ресурсов
  PLAYER_IDLE: '/sprites/player/idle.png',
  PLAYER_JUMP: '/sprites/player/jump.png',
  PLAYER_RUN: '/sprites/player/run.png',
  PLAYER_SLIDE: '/sprites/player/slide.png',
  PLAYER_WALK: '/sprites/player/walk.png',
  FIREBALL: '/sprites/entities/fireball.png',
  BONFIRE: '/sprites/entities/bonfire.png',
  SPEARS: '/sprites/entities/spears.png',
  WALL: '/sprites/entities/wall.png',
  VAPOR: '/sprites/entities/vapor.png',
  BONUS_SLOWING: '/sprites/entities/gems/gem_blue.png',
  BONUS_IMMUNITY: '/sprites/entities/gems/gem_red.png',
  BONUS_SCORE: '/sprites/entities/gems/coin_gold.png',
  BACKGROUND_0_LANDSCAPE: '/sprites/background/city_day/landscape.png',
  BACKGROUND_0_ROAD: '/sprites/background/city_day/road.png',
  BACKGROUND_0_SKY: '/sprites/background/city_day/sky.png',
  BACKGROUND_1_LANDSCAPE: '/sprites/background/city_night/landscape.png',
  BACKGROUND_1_ROAD: '/sprites/background/city_night/road.png',
  BACKGROUND_1_SKY: '/sprites/background/city_night/sky.png',
  BACKGROUND_2_LANDSCAPE: '/sprites/background/forest_day/landscape.png',
  BACKGROUND_2_ROAD: '/sprites/background/forest_day/road.png',
  BACKGROUND_2_SKY: '/sprites/background/forest_day/sky.png',
  BACKGROUND_3_LANDSCAPE: '/sprites/background/forest_night/landscape.png',
  BACKGROUND_3_ROAD: '/sprites/background/forest_night/road.png',
  BACKGROUND_3_SKY: '/sprites/background/forest_night/sky.png',
}

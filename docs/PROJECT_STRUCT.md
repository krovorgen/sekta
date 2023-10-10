# Структура проекта <!-- omit in toc -->

Приложение разделено отдельно на клиентскую и серверную часть.
В папке packages расположены подпапки client и server соответственно.

```
├── <projectRoot>
└── packages/
    ├── docs - (документация)
    ├── client - (клиентская часть)/
    │   ├── public - (глобальная статика)
    │   ├── src/
    │   │   ├── api - (методы API и DTO)
    │   │   ├── assets - (подключаемая статика)
    │   │   ├── components - (дополнительные компоненты UI)
    │   │   ├── constants - (константы проекта)
    │   │   ├── game - (игровой движок)
    │   │   ├── HOC - (компоненты высшего порядка)
    │   │   ├── Layouts - (шаблоны для страниц)
    │   │   ├── pages - (страницы приложения)
    │   │   ├── redux - (хранилище данных)
    │   │   ├── router - (настройка маршрутизации)
    │   │   ├── scss - (стили приложения)
    │   │   ├── types - (типы общего назначения)
    │   │   ├── utils - (утилиты общего назначения)
    │   │   ├── App.tsx - (инициализация приложения)
    │   │   └── main.tsx - (точка входа front-end)
    │   ├── index.html
    │   ├── .stylelintrc.json
    │   ├── babel.config.js
    │   ├── jest.config.js
    │   ├── package.json
    │   ├── tsconfig.json
    │   └── vite.config.ts
    ├── server - серверная часть/
    │   ├── db.ts - (подключение к БД, ORM-классы)
    │   ├── index.ts - (точка входа back-end)
    │   ├── jest.config.js
    │   ├── package.json
    │   └── tsconfig.json
    ├── .gitignore
    ├── .eslintrc.js
    ├── .prettierrc
    ├── docker-compose.yml
    ├── Dockerfile.client
    ├── Dockerfile.server
    ├── lefthook.yml
    ├── package.json
    └── lerna.json
```

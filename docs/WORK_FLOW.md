### Запуск

1. Убедитесь что у вас установлен `node` и `docker`
2. Выполните команду `yarn bootstrap` - это обязательный шаг, без него ничего работать не будет :)
3. Выполните команду `yarn dev`
3. Выполните команду `yarn dev --scope=client` чтобы запустить только клиент
4. Выполните команду `yarn dev --scope=server` чтобы запустить только server


### Добавление зависимостей
В этом проекте используется `monorepo` на основе [`lerna`](https://github.com/lerna/lerna)

Чтобы добавить зависимость для клиента 
```yarn lerna add {your_dep} --scope client```

Для сервера
```yarn lerna add {your_dep} --scope server```

И для клиента и для сервера
```yarn lerna add {your_dep}```


Если вы хотите добавить dev зависимость, проделайте то же самое, но с флагом `dev`
```yarn lerna add {your_dep} --dev --scope server```


### Тестирование

Для клиента используется [`react-testing-library`](https://testing-library.com/docs/react-testing-library/intro/)

```yarn test```

### Линтинг

```yarn lint```

### Форматирование prettier

```yarn format```

### Production build

```yarn build```

И чтобы посмотреть что получилось


`yarn preview --scope client`
`yarn preview --scope server`

## Хуки
В проекте используется [lefthook](https://github.com/evilmartians/lefthook)
Если очень-очень нужно пропустить проверки, используйте `--no-verify` (но не злоупотребляйте :)

## Автодеплой статики на vercel
Зарегистрируйте аккаунт на [vercel](https://vercel.com/)
Следуйте [инструкции](https://vitejs.dev/guide/static-deploy.html#vercel-for-git)
В качестве `root directory` укажите `packages/client`

Все ваши PR будут автоматически деплоиться на vercel. URL вам предоставит деплоящий бот

## Production окружение в докере
Перед первым запуском выполните `node init.js`


`docker compose up` - запустит три сервиса
1. nginx, раздающий клиентскую статику (client)
2. node, ваш сервер (server)
3. postgres, вашу базу данных (postgres)

Если вам понадобится только один сервис, просто уточните какой в команде
`docker compose up {sevice_name}`, например `docker compose up server`

## Размещение проекта на облачных сервисах Yandex Cloud
Генерация/установка сертификата SSL вручную через certbot:
Локально:

`certbot certonly --authenticator manual`
`fire-runner.ya-praktikum.tech` (указать нужный домен)

`ssh -i sekta sekta@VPS_IP`

На ВМ через SSH:

`docker ps`
`docker exec -it ***** bash` (приатачиться к контейнеру)

(записать файл рукопожатия certbot)
`cd /app/client/ssr-dist`
`mkdir .well-known .well-known/acme-challenge`
`cd .well-known/acme-challenge`
`echo *****.***** > *****`
`exit`

Обновление контейнеров в облаке (предварительно установить Yandex CLI):
Локально:

`docker tag prackicum-server cr.yandex/*****/sekta:server`
`docker tag nginx cr.yandex/*****/sekta:nginx`

`docker push cr.yandex/*****/sekta:server`
`docker push cr.yandex/*****/sekta:nginx`

На ВМ через SSH:
`docker pull cr.yandex/*****/sekta:nginx`
`docker pull cr.yandex/*****/sekta:server`

Загрузка папки с локальной машины на ВМ в облаке
`scp -i sekta -r nginx sekta@VPS_IP:nginx`

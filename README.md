# Фронтенд проекта «Messenger»

## Описание

Приложение мессенджер.

[Макет в Figma](https://www.figma.com/file/Ua9cekgMgr02O2A1yuFKZM/%5Bniksmo%5D_Messenger?type=design&node-id=0%3A1&mode=design&t=sPwR4djZwzHhCgUS-1)

Проект развёрнут на Netlify и доступен по URL - https://lambent-kangaroo-ac7913.netlify.app

### Технологии

[![Handlebars][Handlebars-badge]][Handlebars-url]
[![Vite][Vite-badge]][Vite-url]

## Установка и Запуск

У вас должнен быть установлен NodeJS v18.18.2

1. Клонировать репозиторий

   ```shell
   git clone git@github.com:niksmo/messenger.git
   cd messenger
   ```

2. Установить зависимости

   ```shell
   npm ci
   ```

### Запуск для разработки

1. Запустить скирпт

```shell
npm run dev
```

2. Браузер автоматически откроет новую вкладу с адресом сервера http://localhost:5173/

## Сборка для деплоя

1. Запустить скирпт

```shell
npm run build
```

2. Бандл для переноса на сервер будет собран в папке dist

3. Чтобы проверить сборку, запустите `express` сервер на 3000 порту с помощью скрипта

```shell
npm run start
```

4. Откройте веб-страницу по адресу http://localhost:3000/

<!-- MARKDOWN LINKS & BADGES -->

[Handlebars-url]: https://handlebarsjs.com/
[Handlebars-badge]: https://img.shields.io/badge/Handlebars-23272f?style=for-the-badge&logo=handlebarsdotjs
[Vite-url]: https://vitejs.dev/
[Vite-badge]: https://img.shields.io/badge/Vite-23272f?style=for-the-badge&logo=vite

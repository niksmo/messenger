# Фронтенд проекта «Messenger»

### Технологии

[![Handlebars][Handlebars-badge]][Handlebars-url]
[![Vite][Vite-badge]][Vite-url]
[![Mocha][Mocha-badge]][Mocha-url]

## Описание

SPA Приложение "Мессенджер"

Архитектура: MVC + Flux

[Макет в Figma](https://www.figma.com/file/Ua9cekgMgr02O2A1yuFKZM/%5Bniksmo%5D_Messenger?type=design&node-id=0%3A1&mode=design&t=sPwR4djZwzHhCgUS-1)

Проект развёрнут на Netlify и доступен по URL - https://lambent-kangaroo-ac7913.netlify.app

### Реализованные функции

- Авторизация и регистрация
- Редактирование профиля:
  - Установка/изменение аватара
  - Редактирование данных
  - Изменение пароля
- Создание нового чата
- Удаление собственного чата
- Добавление пользователей в чат
- Исключение пользователей из чата
- Отправка/получение текстовых сообщений
- Выход из приложения

## Установка и Запуск

У вас должнен быть установлен NodeJS v20.11.0

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

2. Перейдите в браузере по URL http://localhost:5173/

## Запуск тестов

1. Запустить скрипт

```shell
npm run test
```

2. Отчёт с результатами тестов будет выведен в терминал

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
[Mocha-url]: https://mochajs.org/
[Mocha-badge]: https://img.shields.io/badge/Mocha-23272f?style=for-the-badge&logo=mocha

# Сервер для проекта MESTO на express.js
## Адрес
84.201.156.204

https://api.mestophotoapp.gq/

https://mestophotoapp.gq/
## Версия проекта
v0.2.1 
## Технологии, использованные в проекте
HTML, CSS, JS, express.js, GIT
## Работа с сервером
`npm run start` запуск сервера на localhost:3000  

`npm run dev` запуск сервера на localhost:3000 с хот релоудом  

`mongodb://localhost:27017/mestodb` - адрес подключения Node.js к серверу Mongo
## Запросы к API
`GET /users` возвращает всех пользователей базы
 
`GET /users/:userId` возвращает конкретного пользователя

`PATCH /users/me` обновляет информацию профиля

`PATCH /users/me/avatar` обновляет аватар профиля

`GET /cards` возвращает все карточки

`POST /cards` создает новую карточку

`PUT /cards/:cardId/likes` ставит карточке лайк

`DELETE /cards/:cardId/likes` убирает лайк у карточки

`POST /signup` регистрация нового пользователя

`POST /signin` авторизация пользователя

# Проект «[MOVIES](https://movies.voitekhovich.nomoredomains.club/)» (backend)

Дипломный проект [Яндекс.Практикум](https://practicum.yandex.ru/) по курсу "Web-разработчик".\
Сервис, в котором можно найти фильмы по запросу и сохранить в личном кабинете.\
API: https://api.movies.voitekhovich.nomoredomains.club

https://user-images.githubusercontent.com/30049720/228648047-0b5c3594-a0c4-4466-b7a8-fadeb4d0894a.mp4

## 🕹 Функционал

* Раздел с описанием проекта и о разработчике
* Регистрация и авторизация пользователей
* Загрузка информации о фильмах по API запросу из стороннего сервиса
* Фильтрация фильмов по имени и продолжительности
* Сохранение/удаление фильма из раздела Избранное
* Редактирование профиля

## 🙄 Используемые технологии

* express.js
* MongoDB
* React
* HTML CSS JS
* Fetch API
* Адаптивная вёрстка по [макету в Figma](https://disk.yandex.ru/d/3kZ7wbwTR-twVg)
* Структура кода по [методолотгии БЭМ](https://ru.bem.info/methodology/)

## 📺 Посмотреть вживую
https://movies.voitekhovich.nomoredomains.club/

## 👾 API запросы

| Запрос | Описание |
|--|--|
| GET /users/me | возвращает информацию о пользователе (email и имя) |
| PATCH /users/me | обновляет информацию о пользователе (email и имя) |
| GET /movies | возвращает все сохранённые текущим  пользователем фильмы |
| POST /movies | создаёт фильм с переданными в теле <br> **country, director, duration, year, description, image, trailer, nameRU, nameEN и thumbnail, movieId** |
| DELETE /movies/\_id | удаляет сохранённый фильм по id |
| POST /signup | создаёт пользователя с переданными в теле <br> **email, password и name** |
| POST /signin | проверяет переданные в теле почту и пароль и возвращает JWT |

## 🛠 Запуск локально

**Зависимости:**
* Node.js - 16.18.0
* MongoDB - 4.4.x

**[Backend:](https://github.com/voitekhovich/movies-explorer-api)**
```
git clone https://github.com/voitekhovich/movies-explorer-api.git
cd movies-explorer-api/
npm i
npm run start
```

**[Frontend:](https://github.com/voitekhovich/movies-explorer-frontend)**
```
git clone https://github.com/voitekhovich/movies-explorer-frontend.git
cd movies-explorer-frontend/
npm i
echo PORT=3001 > .env
npm run start
```

## 🛠 Запуск на сервере

**Зависимости:**
* Node.js - 16.18.0
* MongoDB - 4.4.x
* PM2
* Nginx

**[Backend:](https://github.com/voitekhovich/movies-explorer-api)**
```
git clone https://github.com/voitekhovich/movies-explorer-api.git

echo PORT=3000 >> ~/movies-explorer-api/.env
echo JWT_SECRET=[YOUR_JWT_SECRET] >> ~/movies-explorer-api/.env
echo JWT_EXPIRESIN=7d >> ~/movies-explorer-api/.env

cd ~/movies-explorer-api
npm i
pm2 start movies
```
**[Frontend:](https://github.com/voitekhovich/movies-explorer-frontend)**
```
git clone https://github.com/voitekhovich/movies-explorer-frontend.git

echo PORT=3001 >> ~/movies-explorer-frontend/.env
echo REACT_APP_BASE_URL='https://[YOUR_BACKEND_URL]' >> ~/movies-explorer-frontend/.env

cd ~/movies-explorer-frontend
npm i
npm run build
chmod +x ~/movies-explorer-frontend/build/
```
Настройка nginx `/etc/nginx/sites-available/default`
```
server {
      listen 80;
      server_name [YOUR_BACKEND_DOMAIN];
      location / {
                proxy_pass http://localhost:3001;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
      }
}

server {
      listen 80;
      server_name [YOUR_FRONTEND_DOMAIN];
      root /home/[YOUR_USERNAME]/movies-explorer-frontend/build;
      location / {
                try_files $uri $uri/ /index.html;
      }
}
```

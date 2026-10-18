# Git Card

Профиль GitHub-пользователя в виде аккуратной карточки: аватар, статистика, языки, график коммитов и топ репозиториев.

## Стек

**Фронтенд**

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript_6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)


**Бэкенд**

![Vercel](https://img.shields.io/badge/Vercel_Serverless-000000?style=for-the-badge&logo=vercel&logoColor=white)

**Данные**

![GitHub REST](https://img.shields.io/badge/GitHub_REST_API-181717?style=for-the-badge&logo=github&logoColor=white)
![GitHub GraphQL](https://img.shields.io/badge/GitHub_GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)

<a href="https://git-card-eta.vercel.app"><img alt="Скриншот Git Card" src="img.png" /></a>



## О проекте

**Git Card** — веб-приложение, которое превращает профиль GitHub в компактную карточку. Введи логин — и получишь всё самое важное о пользователе в одном месте.

## Возможности

- **Живой поиск** с подсказками (debounce + отмена устаревших запросов)
- **Навигация с клавиатуры** по подсказкам — `↑` `↓`, `Enter`, `Esc`
- **Профиль** — аватар, имя, bio, статистика (followers / following / repos)
- **Языковая статистика** — топ-6 языков по объёму кода, с процентами и фирменными цветами
- **График коммитов** за год + подсчёт текущего стрика
- **Топ репозиториев** по звёздам — язык и звёзды
- **Тёмная / светлая тема** с сохранением выбора в `localStorage`



## API

Серверные функции находятся в каталоге `/api`:

| Эндпоинт | Описание |
| --- | --- |
| `GET /api/user` | Профиль пользователя |
| `GET /api/hints` | Подсказки для поиска |
| `GET /api/repos` | Топ репозиториев по звёздам |
| `GET /api/contributions` | Календарь коммитов (GraphQL) |
| `GET /api/languages` | Статистика языков (GraphQL) |

 
## Демо

Проект задеплоен на Vercel: [git-card-eta.vercel.app](https://git-card-eta.vercel.app)

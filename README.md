# test-balance-app

```markdown
# 💸 Wallet App (Node.js + Express + Sequelize)

Тестовое задание

---

## 📦 Установка

Установите зависимости:

```bash
npm i
```

---

## 🚀 Запуск проекта

Запустите сервер:

```bash
npm run start
```

По умолчанию сервер доступен на [http://localhost:3000](http://localhost:3000)

---

## 🔧 Миграции

Выполните миграции и добавьте тестового пользователя:

```bash
npm run migrate
```

После этого в БД будет создана таблица `Users` с пользователем и балансом `10000`.

---

## 🧪 Тестирование нагрузки

Для запуска теста, который отправит 10 000 параллельных запросов на списание по 2 единицы:

```bash
npm run test
```

Успешно должно пройти 5000 запросов. Остальные получат ошибку `Недостаточно средств`.

---

## 📁 Структура проекта

```
src/
├── modules/
│   ├── database/
│   │   ├── migrations/           # Umzug миграции
│   │   │   └── 20240322-create-user.js
│   │   ├── repositories/         # Работа с моделями
│   │   │   └── user.repository.js
│   │   ├── database.js           # Инициализация Sequelize
│   │   └── migrate.js            # Запуск миграций
│   └── user/
│       ├── controllers/
│       │   └── user-wallet.controller.js
│       └── services/
│           └── user-wallet.service.js
├── test/
│   └── balance.test.js           # Нагрузочное тестирование
├── app.js                        # Инициализация приложения

```

---

## ⚙️ Используемые технологии

- Node.js
- Express
- Sequelize
- PostgreSQL
- Umzug (для миграций)
- Axios + p-limit (для нагрузочного теста)
```

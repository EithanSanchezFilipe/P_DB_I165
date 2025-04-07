# Backend Usage Guide

Go to `backend` folder:

## Project Setup

```sh
npm install
```

## DB connection

The backend use MySQL database, before starting the Node apllication you need to set a environment variable `DB_URL` to connect to a MySQL server :

```sh
DB_URL="mysql://app_user:app_password@localhost:3306/db_todoapp"
```

## Run and Hot-Reload for Development

```sh
npm run start
```

If you use an _.env_ file in the `backend` folder then run the backend with:

```sh
npm run start:env
```

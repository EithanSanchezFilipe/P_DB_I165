# Docker Services

To run this application, you need the MySQL service.

As part of this project, you'll need to modify the Node/Express backend to use the MongoDB NoSQL Document database instead of MySQL.

You'll also be implementing a frontend page cache using the Redis key-value NoSQL database.

To easily install and start these 3 services under Docker on your PC, run the following command:

```sh
docker compose up -d
```

To stop the services, run the following command:

```sh
docker compose down
```

The 3 services store their respective database data in Docker volumes. 

To stop the services and also delete the Docker volumes, run the following command:

```sh
docker compose down -v
```

## MySQL DB credentials

- Root password: admin
- App database: db_todoapp
- App db user: app_user
- App db password: app_password

## Mongo DB credentials

- Root user : root
- Root password : admin


## Redis DB credentials

- Root user : default
- Root password : admin
## How to Run Project
```bash
# without docker
$ npm install
$ npm run typeorm:run-migrations

- create .env file based on .env.example 

$ npm run start:dev

- open localhost:3000/documentations for API documentations
```

```bash
# with docker
$ docker-compose up --build

- it is automate running db on port 5432 based on .env.example. the value can change within .env.example file

- open localhost:3000/documentations for API documentations
```
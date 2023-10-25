    # Read me

### Setup on you local system:
1. copy `.env.example` to `.env`
2. Run `docker-compose up`, It'll take some to build the containers.
3. Check the health via `http://localhost:4201/api/health`


## Database Migrations
``` bash
# This will generate Dummy model and Dummy Migration
   
npx sequelize-cli model:generate --name Dummy --attributes firstName:string,lastName:string,email:string
    
```
``` bash
# Docs: https://sequelize.org/v6/index.html

# Run this command after logging in app docker container
# All command related to sequelize-cli will be in app docker container.

npx sequelize-cli db:migrate


# create new seed file
npx sequelize-cli seed:generate --name demo-user 

# Sequelize Commands

npx sequelize-cli db:migrate:undo:all                   will undo all migrations
npx sequelize-cli db:migrate:undo                       will undo last migration
npx sequelize-cli db:migrate:undo:<migration name>      will undo migration
npx sequelize-cli db:migrate:<migration name>           will run migration
npx sequelize-cli db:migrate:status                     will show migration status
npx sequelize-cli db:seed:all                           will run all seeds
npx sequelize-cli db:seed:undo:all                      will undo all seeds
npx sequelize-cli db:seed:undo:<seed name>              will undo seed
npx sequelize-cli db:seed:<seed name>                   will run seed

```

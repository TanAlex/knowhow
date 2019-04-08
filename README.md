# KnowHow 

## Express and MySQL based simple knowledge base project

### Build process
```
apt  install docker-compose
git remote add origin https://github.com/TanAlex/knowhow.git
build -t simartar/knowhow .

```



### Deploy process
```
mkdir /app
cd /app
git clone https://github.com/TanAlex/knowhow.git

cd knowhow

#SET Environment Variable to PROD
export ENVIRONMENT="PROD"

#Use docker-compose config to check settings
#make sure the ENVIRONMENT  set to PROD
root@ubuntu-simartar-01:/app/knowhow# docker-compose config
services:
  front:
    build:
      context: /app/knowhow
    environment:
      ENVIRONMENT: PROD

docker-compose up -d

docker exec -it <mysql-container-id> bash
# run the mysql creation database and user commands

```

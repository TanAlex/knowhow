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

docker-compose -e ENVIRONMENT=PROD up -d

docker exec -it <mysql-container-id> bash
# run the mysql creation database and user commands

```
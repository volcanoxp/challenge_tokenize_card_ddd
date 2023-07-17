# Implementation of the Card Tokenization project

## **Usage**

### **Technologies**
1. [Docker Compose](https://docs.docker.com/compose/)
2. [NodeJs V18.16.0](https://nodejs.org/es)
3. [TypeScript](https://www.typescriptlang.org/)
4. [Redis](https://redis.io/)
5. [Serverless](https://www.serverless.com/)

### **Steps for local development**
1. Install redis database
```
docker-compose up -d
```
2. Install dependencies
```
npm install
```
3. Run and start to test apis
```
npm run start
```

### **Extra commands**
1. Run test
```
npm run test
```
2. Verify linter
```
npm run lint
```

## API Endpoints

List of available routes:

**Routes**:\
`POST /tokens` - Generate a token with the card information\
`GET /card/token/:token` - Gets the information of the card with the token


- comments: A bearer token must be used for all requests e.g. **pk_test_123455**

### **API POSTMAN DOCUMENTACION / EXAMPLES**

https://documenter.getpostman.com/view/11308127/2s946fetEC

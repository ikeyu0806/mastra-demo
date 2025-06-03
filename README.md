### サーバー起動
```
npm run dev
```

`http://localhost:4111/api`にアクセスすると「Hello to the Mastra API!」文字列が取得できます。

### Swagger

http://localhost:4111/swagger-ui


### 天気取得デモ
```
curl -X POST http://localhost:4111/api/agents/weatherAgent/generate \
 -H "Content-Type: application/json" \
 -d '{"messages": ["What is the weather in Tokyo Japan?"]}'
 ```

### サーバー起動
```
npm run dev
```

### Top画面
http://localhost:4111にアクセスすると実装されているエージェントなどの一覧が確認できます。


### API
apiパス以下にRest API
- `http://localhost:4111/api`にアクセスすると「Hello to the Mastra API!」文字列が取得できます。

天気取得エージェントにメッセージを送るデモ
```
curl -X POST http://localhost:4111/api/agents/weatherAgent/generate \
 -H "Content-Type: application/json" \
 -d '{"messages": ["What is the weather in Tokyo Japan?"]}'
 ```

FAQエージェントに質問するデモ
```
curl -X POST http://localhost:4111/api/agents/faqAgent/generate \
 -H "Content-Type: application/json" \
 -d '{"messages": ["タレントのプロフィールを修正するには？"]}'
```

### Swagger

http://localhost:4111/swagger-ui



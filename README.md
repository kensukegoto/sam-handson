# SAM CLI

# OutputsでAPI Gatewayのエンドポイントを表示させる

**TranslateAPI**という論理名を作ったらOutputsにて **${TranslateAPI}** でAPIのIDを取得出来る

```YAML
  TranslateAPI:
    Type: AWS::Serverless::Api
    Properties:
      Name: translate-api-2
      StageName: dev
      EndpointConfiguration: REGIONAL
Outputs:
  TranslateAPI:
    Description: "API Gateway endpoint URL for Prod stage for Hello World function"
    Value: !Sub "https://${TranslateAPI}.execute-api.${AWS::Region}.amazonaws.com/dev/translate/"
```

# API GatewayとLambdaの連携をローカルで試す

下記コマンドで試せる。start-apiと別でlambdaも立ち上げる必要があるのか？と思うが、これでLambdaも動く。Lambdaのconsoleも確認出来る。

```
sam local start-api
```

# deploy後のlambdaの更新方法

buildしてdeployする。更新時は`deploy`でOK(`deploy --guided`ではなく)。

```
sam build

sam deploy
```

# deploy後の削除

```
aws cloudformation delete-stack --stack-name スタック名
```

# dynamoの操作

[【詳解】JavascriptでDynamoDBを操作する](https://qiita.com/Fujimon_fn/items/66be7b807a8329496899)
<br><br>
AWS.DynamoDBではなくAWS.DynamoDB.DocumentClientを使うとJSの型をDynamoで使える型に自動で変換してくれる。
<br><br>

**[注意]await new Promiseの中で操作を書かないと失敗する。**

```js
const params = {
     TableName: 'translate-history-2',
     Item:{
          "timestamp": new Date().getTime().toString()
     }
};

await new Promise(resolve => {
     docClient.put(params, (err,data) => {
          resolve(data);
     });
})
```



# インストール

https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html

# コマンド一覧

https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html

# sam init

# sam build

# sam deploy --guided

# sam validate

# 開発

```
// 変更したらbuild
sam build

// lambdaをローカルで試したい
// https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-start-lambda.html
sam lodal start-lambda

// api gatewayをローカルで試したい
// https://docs.aws.amazon.com/ja_jp/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-start-api.html
sam local start-api



```
aws cloudformation package \
     --template-file template.yaml \
     --s3-bucket translate--lambda-0502 \
     --output-template-file packaged-template.yaml
```

```
aws cloudformation deploy \
     --template-file ./packaged-template.yaml \
     --stack-name hands-on-serverless-2 \
     --capabilities CAPABILITY_IAM
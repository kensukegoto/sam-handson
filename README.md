# SAM CLI

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
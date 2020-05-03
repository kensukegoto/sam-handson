const AWS = require("aws-sdk");
const Translate = new AWS.Translate({region: "ap-northeast-1"});
const docClient = new AWS.DynamoDB.DocumentClient({region: "ap-northeast-1"});

exports.lambdaHandler = async (event, context) => {

    // console.log(event);

    let output_text;

    try {
        const input_text = event.queryStringParameters.text;

        output_text = await new Promise(resolve => {
            let params = {
                Text: input_text,
                SourceLanguageCode: 'ja',
                TargetLanguageCode: 'en',
            }
            Translate.translateText(params, function(err,data){
                if (err) {
                    console.log(err);
                    reject();
                } else {
                    console.log(JSON.stringify(data));
                    resolve(data);
                }
            });
        });

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

    } catch (err) {
        console.log(err);
        return err;
    }

    return {
        "statusCode": 200,
        "body": JSON.stringify({
            output_text,
            message: "頑張っているね！"
        })
    }
};

import * as cdk from "@aws-cdk/core";
import * as lambda from "@aws-cdk/aws-lambda";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as api from "@aws-cdk/aws-apigateway";
import * as iam from "@aws-cdk/aws-iam";

export class XproGqlServer extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string) {
    super(scope, id);

    const xproGqlApiFn = new lambda.Function(this, "XproGqlApiFn", {
      description: "graphql api.",
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset("funcs/graphqlapi"),
      handler: "index.handler",
    });

    xproGqlApiFn.role?.attachInlinePolicy(
      new iam.Policy(this, "XproGqlApiFnPolicy", {
        statements: [
          new iam.PolicyStatement({
            actions: ["dynamodb:*"],
            resources: ["*"],
          }),
        ],
      })
    );
    const xproGqlRestApi = new api.RestApi(this, "XproGqlRestApi", {
      defaultCorsPreflightOptions: {
        allowOrigins: api.Cors.ALL_ORIGINS,
        allowMethods: api.Cors.ALL_METHODS,
      },
      restApiName: "XproGqlRestApi",
      description: "Gateway to the devs!",
    });

    const resource = xproGqlRestApi.root.addResource("v1");
    const proxy = resource.addProxy({
      defaultIntegration: new api.LambdaIntegration(xproGqlApiFn),

      anyMethod: true,
    });

    // const xproGqlApiInt = new api.LambdaIntegration(xproGqlApiFn, {
    //   requestTemplates: { "application/json": '{ "statusCode": "200" }' },
    // });

    // xproGqlRestApi.root.addMethod("POST", xproGqlApiInt);

    const xproUsersTable = new dynamodb.Table(this, "XproUsersTable", {
      partitionKey: { name: "id", type: dynamodb.AttributeType.STRING },
    });

    new cdk.CfnOutput(this, "PaymentIntentApi", {
      value: xproGqlRestApi.urlForPath(),
      description: "http address",
      exportName: "XproGqlRestApi",
    });
  }
}

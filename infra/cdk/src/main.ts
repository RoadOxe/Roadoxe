import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MainStack } from './stacks/main.stack';

const app = new cdk.App();
new MainStack(app, "MainStack", {
  env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },
});
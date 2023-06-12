import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { DeploymentConstruct } from "./construct/deploymentConstruct";

export class MainStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new DeploymentConstruct({
      scope: this,
      id: "deployment-stack",
      bucketName: "roadoxe-s3",
      instanceName: "roadoxe-ec2-instance",
      securityGroupName: "roadoxe-sg",
    });
  }
}

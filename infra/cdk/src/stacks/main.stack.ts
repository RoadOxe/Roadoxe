import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { DeploymentStack } from "./deployment.stack";

export class MainStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new DeploymentStack({
      scope: this,
      id: "deployment-stack",
      bucketName: "roadoxe-s3",
      instanceName: "roadoxe-ec2-instance",
      securityGroupName: "roadoxe-sg",
    });
  }
}

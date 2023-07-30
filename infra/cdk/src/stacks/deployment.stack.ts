import { Construct } from "constructs"
import { StackProps } from "aws-cdk-lib"
import { InitializationStack } from "./Initialization.stack"

export class DeploymentStack extends InitializationStack {

  constructor({
    scope,
    id,
    securityGroupName,
    instanceName,
    bucketName,
  }: {
    scope: Construct;
    id: string;
    props?: StackProps;
    securityGroupName: string;
    instanceName: string;
    bucketName: string;
  }) {
    super(scope, id);

    const bucket = this.createBucket("roadoxe-bucket", {bucketName});

    const ec2Instance = this.createEc2(
     "roadoxe-ec2",
      securityGroupName,
      instanceName,
    );

    bucket.grantReadWrite(ec2Instance);
  }
}


import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { S3Construct } from "./s3Contruct";
import { ec2Construct } from "./ec2Construct";
import { StackProps } from "aws-cdk-lib";

export class DeploymentConstruct extends Construct {
  public s3Bucket: Bucket;
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

    const s3 = new S3Construct({
      scope: this,
      id: "s3",
      bucketName,
    });

    const ec2Instance = new ec2Construct({
      scope: this,
      id: "ec2",
      securityGroupName,
      instanceName,
    });

    s3.s3Bucket.grantReadWrite(ec2Instance.ec2Instance);
  }
}


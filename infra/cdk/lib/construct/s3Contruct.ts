import { Construct } from "constructs";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { StackProps, RemovalPolicy } from "aws-cdk-lib";

export class S3Construct extends Construct {
  public s3Bucket: Bucket;

  constructor({
    scope,
    id,
    bucketName,
  }: {
    scope: Construct;
    id: string;
    props?: StackProps;
    bucketName: string;
  }) {
    super(scope, id);

    const bucket = new Bucket(this, `${id}-bucket`, {
      bucketName,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    this.s3Bucket = bucket;
  }
}


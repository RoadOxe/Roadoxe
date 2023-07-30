import { Construct } from "constructs";
import { Bucket, BucketProps, IBucket } from "aws-cdk-lib/aws-s3";
import { StackProps, RemovalPolicy } from "aws-cdk-lib";
import { AnyPrincipal, Effect, PolicyStatement } from "aws-cdk-lib/aws-iam";

interface ICustomBucket extends BucketProps {
  scope: Construct,
  id: string,
}

export class CustomBucket extends Bucket {
  constructor({
    scope,
    id,
    bucketName,
  }: ICustomBucket) {
    super(scope, id, {
      bucketName,
      removalPolicy: RemovalPolicy.DESTROY,
    })
  }

  grantPublicRead() {
    this.addToResourcePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:GetObject'],
        principals: [new AnyPrincipal()],
        resources: [this.bucketArn + '/*'],
      })
    );
    
  }

}
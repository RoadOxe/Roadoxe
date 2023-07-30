import { Construct } from "constructs"
import { CustomBucket } from "../construct/bucket.construct"
import { CustomEC2 } from "../construct/ec2Construct"
import { Stack, StackProps } from "aws-cdk-lib"
import { BucketProps } from "aws-cdk-lib/aws-s3"

export class InitializationStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id);
  }

  protected createBucket(id: string, bucketProps: BucketProps) {
    return new CustomBucket({
      scope: this,
      id,
      ...bucketProps
    });
  }

  protected createEc2(id: string, securityGroupName: string, instanceName: string) {
    return new CustomEC2({
      scope: this,
      id,
      securityGroupName,
      instanceName
    })
  }
}


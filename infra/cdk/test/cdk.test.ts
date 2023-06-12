import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import * as Cdk from "../lib/main-stack";

describe("MainStack", () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  let template: Template;

  beforeAll(() => {
    app = new cdk.App();
    stack = new Cdk.MainStack(app, "MainStack", {
      env: {
        account: "746789327319",
        region: "eu-north-1",
      },
    });
    template = Template.fromStack(stack);
  });

  it("S3 bucket should be Created", () => {
    template.hasResourceProperties("AWS::S3::Bucket", {
      BucketName: "roadoxe-s3",
    });
  });

  it("Security Group for EC2 should be Created", () => {
    template.hasResourceProperties("AWS::EC2::SecurityGroup", {
      GroupName: "roadoxe-sg",
    });
  });

  it("EC2 instance should be Created", () => {
    template.hasResourceProperties("AWS::EC2::Instance", {
      Tags: [
        {
          Key: "Name",
          Value: "roadoxe-ec2-instance",
        },
      ],
    });
  });
});

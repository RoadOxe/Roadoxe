import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export interface ICustomEC2Props {
  scope: Construct;
    id: string;
    props?: cdk.StackProps;
    securityGroupName: string;
    instanceName: string;
}

export class CustomEC2 extends ec2.Instance {
  constructor({
    scope,
    id,
    securityGroupName,
    instanceName,
  }: ICustomEC2Props) {


    const defaultVpc = ec2.Vpc.fromLookup(scope, `${id}-VPC`, {
      isDefault: true,
    });

    const securityGroup = new ec2.SecurityGroup(scope, `${id}-instance-sg`, {
      vpc: defaultVpc,
      allowAllOutbound: true,
      securityGroupName,
    });

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      "Allows SSH access from Internet"
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allows HTTP access from Internet"
    );

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      "Allows HTTPS access from Internet"
    );
    super(scope, id, {
      vpc: defaultVpc,
      securityGroup: securityGroup,
      instanceName,
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      // keyName: 'simple-instance-1-key', // TODO: we will create this in the console before we deploy
    })

     // we want the ip address of this new instance so we can ssh into it later
     new cdk.CfnOutput(this, `${id}-EC2-instance-output`, {
      value: this.instancePublicIp,
    });
  }
}

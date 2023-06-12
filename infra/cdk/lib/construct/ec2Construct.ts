import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ec2 from "aws-cdk-lib/aws-ec2";

export class ec2Construct extends Construct {
  public ec2Instance: ec2.Instance;

  constructor({
    scope,
    id,
    securityGroupName,
    instanceName,
  }: {
    scope: Construct;
    id: string;
    props?: cdk.StackProps;
    securityGroupName: string;
    instanceName: string;
  }) {
    super(scope, id);
    const defaultVpc = ec2.Vpc.fromLookup(this, `${id}-VPC`, {
      isDefault: true,
    });

    const securityGroup = new ec2.SecurityGroup(this, `${id}-instance-sg`, {
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

    const instance = new ec2.Instance(this, `${id}-instance`, {
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
    });

    this.ec2Instance = instance;

    // we want the ip address of this new instance so we can ssh into it later
    new cdk.CfnOutput(this, `${id}-EC2-instance-output`, {
      value: instance.instancePublicIp,
    });
  }
}


import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2' 
import * as iam from 'aws-cdk-lib/aws-iam'
import * as s3 from 'aws-cdk-lib/aws-s3';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

      const bucket= new s3.Bucket(this, 'roadoxe-bucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

        
    const defaultVpc = ec2.Vpc.fromLookup(this, 'VPC', { isDefault: true })

    
    const securityGroup = new ec2.SecurityGroup(
      this,
      'roadoxe-instance-sg',
      {
        vpc: defaultVpc,
        allowAllOutbound: true, // will let your instance send outboud traffic
        securityGroupName: 'roadoxe-instance',
      }
    )

    // lets use the security group to allow inbound traffic on specific ports
    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(22),
      'Allows SSH access from Internet'
    )

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      'Allows HTTP access from Internet'
    )

    securityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(443),
      'Allows HTTPS access from Internet'
    )

    const instance = new ec2.Instance(this, 'roadoxe-instance', {
      vpc: defaultVpc,
      securityGroup: securityGroup,
      instanceName: 'roadoxe',
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      }),
      // keyName: 'simple-instance-1-key', // we will create this in the console before we deploy
    })

    bucket.grantRead(instance)

    // cdk lets us output prperties of the resources we create after they are created
    // we want the ip address of this new instance so we can ssh into it later
    // new cdk.CfnOutput(this, 'simple-instance-1-output', {
    //   value: instance.instancePublicIp
    // })
  }
}

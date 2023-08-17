import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { MyService } from '../lib/mystack';

export class TypescriptTestStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    // The code that defines your stack goes here
    new MyService(this, "Fuquetto");
    // example resource
    // const queue = new sqs.Queue(this, 'TypescriptTestQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}

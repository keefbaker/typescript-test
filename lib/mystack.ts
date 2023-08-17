#!/usr/bin/env node
import { aws_s3 as s3 } from 'aws-cdk-lib';
import * as cdk from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class MyService extends Construct {
    constructor(scope: Construct, name: string) {
        super(scope, name);
        const bucket = new s3.Bucket(this, name + "Bucket", {
            versioned: true,
            encryption: s3.BucketEncryption.S3_MANAGED,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            enforceSSL: true,
            accessControl: s3.BucketAccessControl.LOG_DELIVERY_WRITE
        });
        const vpc = new ec2.Vpc(this, name + "Vpc", {
            ipAddresses: ec2.IpAddresses.cidr("10.0.0.0/16"),
            enableDnsHostnames: true,
            enableDnsSupport: true,
            availabilityZones: ["eu-west-1a", "eu-west-1b"],
            subnetConfiguration: [
                {
                    name: name + "-private-a",
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    cidrMask: 24
                },
                {
                    name: name + "-private-b",
                    subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
                    cidrMask: 24
                },
                {
                    name: name + "-public-a",
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 27,
                    mapPublicIpOnLaunch: true
                },
                {
                    name: name + "-public-b",
                    subnetType: ec2.SubnetType.PUBLIC,
                    cidrMask: 27,
                    mapPublicIpOnLaunch: true
                },
            ]
        })
    };
}
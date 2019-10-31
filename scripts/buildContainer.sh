#!/usr/bin/env bash

die() { echo "$1" >&2; exit 1; }

hash aws 2>/dev/null    || die "missing aws!"
hash docker 2>/dev/null || die "missing docker!"

# check everything is turned on and that we're authenticated.
docker info &>/dev/null                 || die "docker's not running"
aws sts get-caller-identity &>/dev/null || die "missing aws auth, y'all"

#aws_parameters=$(aws ssm get-parameters-by-path --path $incident-management --with-decryption --query 'Parameters[*].{Name:Name,Value:Value}')

$(aws ecr get-login --no-include-email --region ap-southeast-2)
docker build -t incident-management-docker-repository .
docker tag incident-management-docker-repository:latest 325571649150.dkr.ecr.ap-southeast-2.amazonaws.com/incident-management-docker-repository:latest
docker push 325571649150.dkr.ecr.ap-southeast-2.amazonaws.com/incident-management-docker-repository:latest

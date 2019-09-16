https://myobconfluence.atlassian.net/wiki/spaces/AL/pages/793641959/Getting+Started+with+the+Jupiter+Platform#GettingStartedwiththeJupiterPlatform-Logging

kubectl apply -f basic.yaml -n training

Push (steps taken from AWS ECR):
$(aws ecr get-login --no-include-email --region ap-southeast-2)
docker build -t incident-management-docker-repository .
docker tag incident-management-docker-repository:latest 325571649150.dkr.ecr.ap-southeast-2.amazonaws.com/incident-management-docker-repository:latest
docker push 325571649150.dkr.ecr.ap-southeast-2.amazonaws.com/incident-management-docker-repository:latest

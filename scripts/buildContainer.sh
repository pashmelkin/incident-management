myob-auth l

$(aws ecr get-login --no-include-email --region ap-southeast-2)
docker build -t incident-management-docker-repository .
docker tag incident-management-docker-repository:latest 325571649150.dkr.ecr.ap-southeast-2.amazonaws.com/incident-management-docker-repository:latest
docker push 325571649150.dkr.ecr.ap-southeast-2.amazonaws.com/incident-management-docker-repository:latest

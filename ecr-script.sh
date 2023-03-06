#!/usr/bin/env bash
ECR_REPOSITORY=151345152001.dkr.ecr.ap-northeast-2.amazonaws.com
aws ecr get-login-password --region ap-northeast-2 | \
  docker login --username AWS --password-stdin ${ECR_REPOSITORY}
docker build . -t popo-public-web
docker image tag popo-public-web:latest ${ECR_REPOSITORY}/popo-public-web:latest
docker push ${ECR_REPOSITORY}/popo-public-web:latest

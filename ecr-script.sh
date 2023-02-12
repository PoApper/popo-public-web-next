aws ecr get-login-password --region ap-northeast-2 | \
  docker login --username AWS --password-stdin 151345152001.dkr.ecr.ap-northeast-2.amazonaws.com
docker build . -t popo-public-web
docker image tag popo-public-web:latest 151345152001.dkr.ecr.ap-northeast-2.amazonaws.com/popo-public-web:latest
docker push 151345152001.dkr.ecr.ap-northeast-2.amazonaws.com/popo-public-web:latest

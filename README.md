# POPO Public Web

<br />
<br />

<p align="center">
<img src="https://img.shields.io/badge/node-%3E%3D16.13.2-brightgreen">
<img src="https://img.shields.io/badge/npm-%3E%3D8.3.1-brightgreen">
</p>

<p align="center">
  <a href="http://popo.poapper.club">
    <img src="https://raw.githubusercontent.com/PoApper/POPO-nest-api/master/assets/popo.svg" alt="Logo" height="150">
  </a>
  <p align="center">
    Public Web for POPO @ <a href="https://github.com/PoApper">PoApper</a>
    <br />
    POPO, POstechian's POrtal
    <br />
    👉 <a href="http://popo.poapper.club">POPO</a>
  </p>
</p>

## About

POPO는 PoApper에서 개발하고, POSTECH 총학생회에서 운영하는 포털 사이트입니다. POPO를 통해 교내의 장소/장비를 예약하고, 자치단체 및 동아리 정보를 열람할 수 있습니다.


## Commands

```bash
$ npm install
# fill correct envrionments variables to .env file
$ npm start
```

### docker

#### On Your Local Computer

```bash
$ docker build . -t popo-public-web
# fill .env.development file
$ docker-compose -f ./docker-compose.dev.yaml up -d --build
```

#### Prod/Dev Release

git tag를 추가/수정하면 Github Action이 트리거 된다. Github Action에서 도커 이미지를 빌드하고 AWS ECR에 push 한다. 그러면, Docker Swarm 클러스터의 마스터 노드가 새로운 이미지가 push 된 걸 확인하고 새로운 이미지로 디플로이 한다.

이때, Prod 배포 할지, Dev 배포 할지는 git tag에 따라 결정된다.

```bash
# Prod 배포
$ git tag release-1.2.3

# Dev 배포
$ git tag any-other-tags
```

git tag에 `release-`라는 접두사를 붙이면 Prod 배포된다. 그외의 경우엔 Dev에 배포된다.


## Stack

### Interpreter

- `node >= 16.13.2`
- `npm >= 8.3.1`

### Framework

- `NextJS >= 12.0.7`

### CSS

- `Semantic-ui-react`

### Runner

- AWS EC2

## Contributors & Maintainer

- Seokyun Ha ([@bluehorn07](https://github.com/BlueHorn07))
- Jeongwon Choi ([@jjeongone](https://github.com/jjeongone))

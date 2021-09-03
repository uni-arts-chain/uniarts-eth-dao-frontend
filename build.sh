#!/bin/sh

docker build -t uni-arts-airdrop .
docker tag uni-arts-airdrop registry.cn-hongkong.aliyuncs.com/tatmas/uni-arts-airdrop
docker login --username=lixiumiao@1837074167842277 registry.cn-hongkong.aliyuncs.com
docker push registry.cn-hongkong.aliyuncs.com/tatmas/uni-arts-airdrop
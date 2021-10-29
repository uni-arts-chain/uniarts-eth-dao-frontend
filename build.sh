#!/bin/sh

docker build -t uni-arts-airdrop-demo .
docker tag uni-arts-airdrop-demo registry.cn-hongkong.aliyuncs.com/tatmas/uni-arts-airdrop:demo
docker login --username=lixiumiao@1837074167842277 --password=tatmas2020 registry.cn-hongkong.aliyuncs.com
docker push registry.cn-hongkong.aliyuncs.com/tatmas/uni-arts-airdrop:demo

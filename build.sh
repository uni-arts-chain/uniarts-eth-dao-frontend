#!/bin/sh

docker build -t uni-arts-airdrop .
docker tag uni-arts-airdrop registry.cn-hongkong.aliyuncs.com/uniarts/uni-arts-airdrop
docker login --username=jieliantech --password=tatmas2020 registry.cn-hongkong.aliyuncs.com
docker push registry.cn-hongkong.aliyuncs.com/uniarts/uni-arts-airdrop
docker tag uni-arts-airdrop registry.cn-hongkong.aliyuncs.com/uniarts/uni-arts-airdrop:v1.0.0
docker push registry.cn-hongkong.aliyuncs.com/uniarts/uni-arts-airdrop:v1.0.0

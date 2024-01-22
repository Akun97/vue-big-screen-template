yarn build
echo ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1
docker manifest rm ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1
docker build --platform linux/arm64 -t ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1-arm64v8 -f Dockerfile --build-arg BASE_IMAGE=arm64v8/nginx:stable .
docker build --platform linux/amd64 -t ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1-x86_64 -f Dockerfile --build-arg BASE_IMAGE=nginx:stable .
docker push ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1-arm64v8
docker push ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1-x86_64
# 创建多平台 Manifests
docker manifest create ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1 \
    ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1-arm64v8 \
    ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1-x86_64
# 设置 Manifests 中的平台信息
docker manifest annotate ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1 \
    ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1-arm64v8 --os linux --arch arm64 --variant v8
docker manifest annotate ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1 \
    ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1-x86_64 --os linux --arch amd64
# 推送多平台 Manifests 到 Docker 镜像仓库
docker manifest push ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1
echo ps-docker-registry.cn-beijing.cr.aliyuncs.com/psdsframework/vue-big-screen-template:$1
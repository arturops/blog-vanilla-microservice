docker_build(
    "arturops/vanilla-blog-client",
    context="./client",
    dockerfile="./client/Dockerfile",
    live_update=[
        sync(
            "./client/src/",
            "/app"
        )
    ]
)

docker_build(
    "arturops/vanilla-comments",
    context="./comments",
)

docker_build(
    "arturops/vanilla-posts",
    context="./posts",
)

docker_build(
    "arturops/vanilla-moderation",
    context="./moderation",
)

docker_build(
    "arturops/vanilla-event-bus",
    context="./event-bus",
)

docker_build(
    "arturops/vanilla-query",
    context="./query",
)

infra_prefix = "./infra/k8s"
k8s_yaml(
    [
        infra_prefix+"/client/deploy.yaml",
        infra_prefix+"/client/svc.yaml",
        infra_prefix+"/comments/deploy.yaml",
        infra_prefix+"/comments/svc.yaml",
        infra_prefix+"/posts/deploy.yaml",
        infra_prefix+"/posts/svc.yaml",
        infra_prefix+"/moderation/deploy.yaml",
        infra_prefix+"/moderation/svc.yaml",
        infra_prefix+"/query/deploy.yaml",
        infra_prefix+"/query/svc.yaml",
        infra_prefix+"/event-bus/deploy.yaml",
        infra_prefix+"/event-bus/svc.yaml",
        infra_prefix+"/ingress.yaml",
    ]
)

k8s_resource(new_name="ingress-svc", objects=["ingress-svc:ingress"], links=["vanilla-blog.com"])
# after all this is running you need to run "$minikube tunnel" to expose the ingress in your mac localhost
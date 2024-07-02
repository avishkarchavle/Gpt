def create_endpoint_sample(
    project: "active-tangent-428009-a6",
    display_name: "gpt",
    location: "us-central1",
):
    aiplatform.init(project=project, location=location)

    endpoint = aiplatform.Endpoint.create(
        display_name=display_name,
        project=project,
        location=location,
    )

    print(endpoint.display_name)
    print(endpoint.resource_name)
    return endpoint

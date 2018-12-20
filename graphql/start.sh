#! /bin/bash
docker run -d -p 11443:8080 \
       --name=graphql \
       --network=SA \
       -e HASURA_GRAPHQL_DATABASE_URL=postgres://postgres:postgres@postgis:5432/postgres \
       -e HASURA_GRAPHQL_ENABLE_CONSOLE=true \
       hasura/graphql-engine:v1.0.0-alpha33

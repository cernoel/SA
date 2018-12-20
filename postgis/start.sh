
# this runs from the outside .. but no localhost
docker run -d -p 5432:5432 --network=SA --name postgis -e "POSTGRES_PASSWORD=postgres" --rm postgisandtools:simple

#docker run -d -P --publish 127.0.0.1:5432:5432 --name postgis -e POSTGRES_PASSWORD=postgres --rm postgisandtools:simple

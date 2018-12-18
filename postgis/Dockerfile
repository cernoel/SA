FROM mdillon/postgis:latest

EXPOSE 5432

RUN     apt-get update \
    &&  apt-get install -y --no-install-recommends \
        osmosis osmctools osm2pgsql

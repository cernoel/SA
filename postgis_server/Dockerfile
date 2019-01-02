FROM mdillon/postgis:latest as postgis

ENV POSTGRES_DB postgres

EXPOSE 5432

COPY shops_import.sql /docker-entrypoint-initdb.d/shops_import.sql

COPY --from=postgisandtools:simple /tmp/shops.csv /tmp/shops.csv


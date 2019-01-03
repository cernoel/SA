FROM mdillon/postgis:latest

RUN     apt-get update \
    &&  apt-get install -y --no-install-recommends \
        osmosis osmctools osm2pgsql

WORKDIR /tmp

COPY osmfilter_parameter.txt osmfilter_parameter.txt

COPY shops_import.sql /docker-entrypoint-initdb.d/shops_import.sql

RUN rm *.bz2 && rm *.bz2 || rm *.poly && rm *.poly || rm *.csv && rm *.csv || rm *.o5m && rm *.o5m || rm *.osm && rm *.osm || \ 
    wget http://kti.tugraz.at/staff/rkern/courses/sa/data/Graz.poly && \ 
    wget http://kti.tugraz.at/staff/rkern/courses/sa/data/graz_poi_complete.csv && \
    wget http://kti.tugraz.at/staff/rkern/courses/sa/data/2018-austria-latest.osm.bz2 && \ 
    bzcat 2018-austria-latest.osm.bz2 | osmosis --read-xml enableDateParsing=no file=- --bounding-polygon file="Graz.poly" --write-xml file=- | osmconvert -o="nodes.o5m" --all-to-nodes - && \ 
    osmfilter nodes.o5m --drop-author --drop-version --parameter-file=osmfilter_parameter.txt | osmconvert --csv="@id @lon @lat shop name addr:city addr:postcode addr:street addr:housenumber website contact:email phone" --csv-separator="|" --csv-headline -o=shops.csv -

RUN chmod +r /tmp/shops.csv


FROM mdillon/postgis:latest
WORKDIR /tmp
COPY --from=0 tmp/shops.csv shops.csv
RUN chmod +r /tmp/shops.csv
COPY shops_import.sql /docker-entrypoint-initdb.d/shops_import.sql


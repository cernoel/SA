#!/bin/bash
rm *.o5m && rm *.o5m || rm *.osm && rm *.osm || bzcat 2018-austria-latest.osm.bz2 | osmosis --read-xml enableDateParsing=no file=- --bounding-polygon file="Graz.poly" --write-xml file=- | osmconvert -o="nodes.o5m" --all-to-nodes - && osmfilter nodes.o5m --drop-author --drop-version --parameter-file=osmfilter_parameter.txt | osmconvert --csv="@id @lon @lat shop name addr:city addr:postcode addr:street addr:housenumber website contact:email phone" --csv-separator="|" --csv-headline -o=shops.csv - && PGPASSWORD=postgres psql -h localhost -U postgres -d postgres -f shops_import.sql

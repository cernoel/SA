docker run -d -p 5432:5432 --name postgis -e POSTGRES_PASSWORD=postgres --rm postgisandtools:simple

docker cp osmfilter_parameter.txt postgis:/tmp/osmfilter_parameter.txt
docker cp shops_import.sql postgis:/tmp/shops_import.sql

# here we download the data from the miniweb - webserver, .. this is our cache for the files, so we dont need to download them everytime from the website.
docker exec -it postgis sh -c "cd /tmp && rm *.bz2 && rm *.bz2 || rm *.poly && rm *.poly || rm *.csv && rm *.csv || rm *.o5m && rm *.o5m || rm *.osm && rm *.osm || wget http://kti.tugraz.at/staff/rkern/courses/sa/data/graz_poi_complete.csv && wget http://kti.tugraz.at/staff/rkern/courses/sa/data/Graz.poly && wget http://kti.tugraz.at/staff/rkern/courses/sa/data/2018-austria-latest.osm.bz2 && bzcat 2018-austria-latest.osm.bz2 | osmosis --read-xml enableDateParsing=no file=- --bounding-polygon file=\"Graz.poly\" --write-xml file=- | osmconvert -o=\"nodes.o5m\" --all-to-nodes - && osmfilter \"nodes.o5m\" --drop-author --drop-version --parameter-file=osmfilter_parameter.txt | osmconvert --csv=\"@id @lon @lat shop name addr:city addr:postcode addr:street addr:housenumber website contact:email phone\" --csv-separator=\"|\" --csv-headline -o=shops.csv - && PGPASSWORD=postgres psql -h localhost -U postgres -d postgres -f shops_import.sql"


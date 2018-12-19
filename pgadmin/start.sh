docker run -p 10443:443 \
           -v "/private/var/lib/pgadmin:/var/lib/pgadmin" \
           -v "/private/pgadmin.cert:/certs/server.cert" \
           -v "/private/pgadmin.key:/certs/server.key" \
           -e "PGADMIN_SETUP_EMAIL=chef@sa.at" \
           -e "PGADMIN_SETUP_PASSWORD=Infeldgasse" \
           -e "PGADMIN_ENABLE_TLS=1" \
           -d pgadmin4

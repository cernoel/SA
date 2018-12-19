docker run -p 10443:443 \
           -e "PGADMIN_SETUP_EMAIL=chef@sa.at" \
           -e "PGADMIN_SETUP_PASSWORD=Infeldgasse" \
           -d pgadmin4

docker run --name pgadmin --network=SA -p 10443:80 \
           -e "PGADMIN_SETUP_EMAIL=chef@sa.at" \
           -e "PGADMIN_SETUP_PASSWORD=Infeldgasse" \
           -e "PGADMIN_DEFAULT_EMAIL=chef@sa.at" \
	   -e "PGADMIN_DEFAULT_PASSWORD=Infeldgasse"\
           -d pgadmin4:simple

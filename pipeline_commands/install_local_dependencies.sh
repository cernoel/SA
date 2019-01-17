#!/bin/bash
sudo apt-get update && 
sudo apt-get -y install postgresql postgresql-client-common postgis osmosis osmctools subversion postgresql-contrib postgresql-9.5-postgis-2.2 postgresql-9.5-postgis-scripts postgresql-contrib-9.5 &&
sudo echo -e "local  all   all   trust"  >> /etc/postgresql/9.5/main/pg_hba.conf &&
sudo service postgresql restart 
sudo -u postgres psql << EOF

ALTER USER postgres with password 'postgres';

EOF

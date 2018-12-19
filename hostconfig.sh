# configures the host, to forward exposed ports
# ! every port that docker exposes gets exposed in the real world !
sudo iptables -P FORWARD ACCEPT

# https://development.robinwinslow.uk/2016/06/23/fix-docker-networking-dns/
touch /etc/docker/daemon.json



sudo service docker restart


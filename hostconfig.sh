# configures the host, to forward exposed ports
# ! every port that docker exposes gets exposed in the real world !
sudo iptables -P FORWARD ACCEPT
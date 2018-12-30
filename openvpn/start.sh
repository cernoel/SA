OVPN_DATA="ovpn-data-SA"

docker volume create --name $OVPN_DATA

docker run -v $OVPN_DATA:/etc/openvpn -d -p 1194:1194/udp --name openvpn --network=SA --cap-add=NET_ADMIN kylemanna/openvpn

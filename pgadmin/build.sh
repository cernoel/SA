DOMAIN='softwarearchitekturen.northeurope.cloudapp.azure.com'

docker build . -t pgadmin:simple

RUN apt-get update && \
    apt-get install -y openssl && \
    openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 && \
    openssl rsa -passin pass:x -in server.pass.key -out server.key && \
    rm server.pass.key && \
    openssl req -new -key server.key -out server.csr \
        -subj "/C=AT/ST=Styria/L=Graz/O=SA/OU=IT Department/CN=$DOMAIN" && \
    openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

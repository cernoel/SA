FROM dpage/pgadmin4:latest

EXPOSE 443

RUN mkdir /certs && \
    apt-get update && \
    apt-get install -y openssl && \
    openssl genrsa -des3 -passout pass:x -out /certs/server.pass.key 2048 && \
    openssl rsa -passin pass:x -in server.pass.key -out /certs/server.key && \
    rm /certs/server.pass.key && \
    openssl req -new -key /certs/server.key -out /certs/server.csr \
        -subj "/C=AT/ST=Styria/L=Graz/O=SA/OU=IT Department/CN=softwarearchitekturen.northeurope.cloudapp.azure.com" && \
    openssl x509 -req -days 1096 -in /certs/server.csr -signkey /certs/server.key -out /certs/server.cert


FROM node:18

WORKDIR /usr/src/app

ENV DB_HOST dummy
ENV DB_USER dummy
ENV DB_PASSWORD dummy
ENV DB_PORT 3567 dummy


COPY package*.json ./

#---some useful tools for interactive usage---#
RUN apt-get update && \
    apt-get install -y --no-install-recommends curl

#---install summon and summon-conjur---#
RUN curl -sSL https://raw.githubusercontent.com/cyberark/summon/master/install.sh \
      | env TMPDIR=$(mktemp -d) bash && \
    curl -sSL https://raw.githubusercontent.com/cyberark/summon-conjur/master/install.sh \
      | env TMPDIR=$(mktemp -d) bash
# as per https://github.com/cyberark/summon#linux
# and    https://github.com/cyberark/summon-conjur#install
ENV PATH="/usr/local/lib/summon:${PATH}"

#:wq
#COPY /usr/local/lib/summon /usr/local/lib/summon
#COPY /usr/local/bin/summon /usr/local/bin/summon

# RUN sleep 60

COPY ./secrets.yaml /opt/etc/secrets.yml

RUN npm install

COPY . .

EXPOSE 8080

CMD ["summon", "--provider", "summon-conjur", "-f", "/opt/summon/secrets.yml", "node", "server.js" ]
#CMD ["node", "server.js" ]

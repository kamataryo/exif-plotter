FROM ubuntu:latest

# Install tippeacanoe
RUN apt-get update && apt-get -y install \
	git \
	make \
	build-essential \
	g++ \
	libsqlite3-dev \
	zlib1g-dev && \
  git clone https://github.com/mapbox/tippecanoe.git && \
  cd tippecanoe && \
  make -j && \
  make install

# Exif tool
RUN apt install -y libimage-exiftool-perl

# Install node
RUN apt-get -y install nodejs

COPY entrypoint.sh /entrypoint.sh
COPY /scripts/transform.js /transform.js
COPY /scripts/index.html /index.html
COPY /scripts/server.js /server.js
ENTRYPOINT ["/entrypoint.sh"]

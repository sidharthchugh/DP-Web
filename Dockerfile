# Set the base image to Ubuntu
FROM ubuntu:16.04

MAINTAINER Sidharth Chugh

# Install Node.js and other dependencies
RUN apt-get update && \
    apt-get -y install curl && \
    apt-get -y install git && \
    apt-get -y install wget && \
    curl -sL https://deb.nodesource.com/setup_7.x | bash && \
    apt-get install --yes nodejs

# Install PM2
RUN npm install -g pm2

# Install Directories
COPY * /

COPY webpack /webpack

COPY src /src

COPY server /server

RUN npm install

RUN npm run build


# Expose port
EXPOSE 8002

# Run app
CMD npm start

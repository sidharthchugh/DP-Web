 #!/bin/bash

if [ -z "$1" ]; then
  echo "No collection name provided for import, aborting..."
  exit
else
  collection=$1

  echo "Exporting ${collection} collection..."
  mongoexport --ssl --sslCAFile ~/Dropbox/DigitalPartners/A.\ Database/6.\ Passive\ Database/db.crt -h aws-eu-central-1-portal.0.dblayer.com:15123 -d dp-web-prod -c $collection -u sidharthchugh -p Yoginder.123 -o $collection.json

  echo "Importing ${collection}.json to DigitalPartners DB as ${collection}, dropping previous ${collection} collection..."
  mongoimport -d DigitalPartners --drop -c ${collection} ${collection}.json

  echo "Cleanup: removing local ${collection}.json post-import..."
  rm ${collection}.json
fi

#!/bin/bash

postToHistoryEndpoint(){
  airHumidity=$(( RANDOM % 25 + 50 ))
  groundHumidity=$(( RANDOM % 25 + 50 ))
  temperature=$(( RANDOM % 10 + 25 ))
  curl --location 'http://localhost:3000/api/history/post' \
  --header 'Content-Type: application/json' \
  --data "{
    \"plantId\": 1,
    \"airHumidity\": ${airHumidity},
    \"groundHumidity\": ${groundHumidity},
    \"temperature\": ${temperature}
  }"
}

while true; do
  postToHistoryEndpoint
  sleep 5
done

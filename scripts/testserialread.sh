#!/bin/bash

COUNT=0
while IFS= read -r line; do
  COUNT=$(($COUNT + 1))
  echo "${COUNT}"

  curl --location 'http://localhost:3000/api/history' \
  --header 'Content-Type: application/json' \
  --data "${line}"
  # Process the variable "$line" here
done < /dev/cu.usbmodem1301
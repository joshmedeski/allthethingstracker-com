#!/bin/bash

. wait_for_branch_readiness.sh

# TODO: Replace with arguments
BRANCH_NAME="test" # $1
DB_NAME="allthethingstracker-com" # $2
ORG_NAME="medeski-solutions" # $3
MAX_TIMEOUT=180 # 3 minutes (in seconds)

BRANCH_EXISTS=$(pscale branch list -f csv $DB_NAME | sed '1d' | cut -d, -f1 | grep $BRANCH_NAME)
if [ -n "$BRANCH_EXISTS" ]; then
  # Skip creation if branch already exists
  echo "Branch '$BRANCH_NAME' already exists, skip creation"
else
  # Create PlanetScale database branch
  pscale branch create $DB_NAME $BRANCH_NAME
  echo "Created '$BRANCH_NAME' branch"
fi

echo "Checking if branch '$BRANCH_NAME' is ready for use..."
WAIT=1
while true; do
    BRANCH_READY=$(pscale branch list -f csv $DB_NAME | grep $BRANCH_NAME | cut -d, -f4)
    # test whether output is false, if so, increase wait timeout exponentially
    if [ $BRANCH_READY == true ]; then
        echo "Branch '$BRANCH_NAME' is ready for use."
        break
    elif [ $BRANCH_READY == false ]; then
        # increase wait variable exponentially but only if it is less than max_timeout
        if [ $(($WAIT * 2)) -le $MAX_TIMEOUT ]; then
            $WAIT=$(($WAIT * 2))
        else
          echo "Max timeout of '$MAX_TIMEOUT' reached, exiting..."
          exit 2
        fi  
        echo "Branch '$BRANCH_NAME' is not ready yet. Retrying in $WAIT seconds..."
        sleep $WAIT
    else
        echo "Branch '$BRANCH_NAME' in unknown status"
        exit 3
    fi
done


PASSWORD_IDS=$(pscale password list -f csv $DB_NAME $BRANCH_NAME $BRANCH_NAME | grep $BRANCH_NAME | cut -d, -f1)
echo $PASSWORD_IDS
# delete all password ids
if [ -n "$PASSWORD_IDS" ]; then
  for PASSWORD_ID in $PASSWORD_IDS; do
    pscale password delete --force $DB_NAME $BRANCH_NAME $PASSWORD_ID
  done
  echo "Previous password(s) deleted"
fi

DB_CREDS=$(pscale password create -f csv $DB_NAME $BRANCH_NAME $BRANCH_NAME | grep $BRANCH_NAME)
echo $DB_CREDS
DB_USERNAME=$(echo $DB_CREDS | cut -d, -f3)
DB_HOST=$(echo $DB_CREDS | cut -d, -f4)
DB_PASSWORD=$(echo $DB_CREDS | cut -d, -f8)

echo "DATABASE_URL='mysql://$DB_USERNAME:$DB_PASSWORD@$DB_HOST/$DB_NAME?ssl={"rejectUnauthorized":true}'" > ./.pscale/.env
echo "DATABASE_URL saved to .pscale/.env"

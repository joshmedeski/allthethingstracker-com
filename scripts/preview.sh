#!/bin/bash

# check if netlify-cli is installed
if ! [ -x "$(command -v netlify)" ]; then
  echo 'Error: netlify-cli is not installed.' >&2
  echo 'See https://docs.netlify.com/cli/get-started/'
fi

# check if pscale-cli is installed
if ! [ -x "$(command -v pscale)" ]; then
  echo 'Error: pscale-cli is not installed.' >&2
  echo 'See https://www.percona.com/doc/percona-toolkit/3.0/installation.html'
fi

if ! [ -x "$(command -v netlify)" ] || ! [ -x "$(command -v pscale)" ]; then
  exit 1
fi

PSCALE_DB='allthethingstracker-com'

# store git branch as variable
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# slugify branch name
BRANCH_SLUG=$(echo $BRANCH | tr '[:upper:]' '[:lower:]' | sed -e 's/[^a-z0-9-]/-/g')

# check if pscale branch exists
if ! pscale branch list $PSCALE_DB | grep -q $BRANCH_SLUG; then
  # create pscale branch
  pscale branch create $PSCALE_DB $BRANCH_SLUG
else
  echo "pscale db branch '$BRANCH_SLUG' exists"
fi

PASSWORD_IDS=$(pscale password list -f csv $PSCALE_DB $BRANCH | grep $BRANCH | cut -d, -f1)
echo $PASSWORD_IDS
# delete all password ids
if [ -n "$PASSWORD_IDS" ]; then
  for PASSWORD_ID in $PASSWORD_IDS; do
    pscale password delete --force $PSCALE_DB $BRANCH_SLUG $PASSWORD_ID
  done
  echo "Previous password(s) deleted"
fi

DB_CREDS=$(pscale password create -f csv $PSCALE_DB $BRANCH_SLUG $BRANCH_SLUG | grep $BRANCH_SLUG)
echo "Password Created"
echo $DB_CREDS

DB_HOST=$(echo $DB_CREDS | cut -d',' -f5)
DB_USERNAME=$(echo $DB_CREDS | cut -d',' -f3)
DB_PASSWORD=$(echo $DB_CREDS | cut -d',' -f9)
echo "username"
echo $DB_USERNAME
echo "host"
echo $DB_HOST
echo "password"
echo $DB_PASSWORD

# merge db username host and password into one string
DATABASE_URL="mysql://$DB_USERNAME:$DB_PASSWORD@$DB_HOST/$PSCALE_DB?ssl={'rejectUnauthorized':true}"

netlify env:set DATABASE_URL $DATABASE_URL --context $BRANCH branch-deploy


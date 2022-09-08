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





# store git branch as variable
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# slugify branch name
BRANCH_SLUG=$(echo $BRANCH | tr '[:upper:]' '[:lower:]' | sed -e 's/[^a-z0-9-]/-/g')

# check if netlify deploy preview is running
if [ -z "$CONTEXT" ]; then
  echo "Not a Netlify deploy preview, skipping build"
  exit 0
fi



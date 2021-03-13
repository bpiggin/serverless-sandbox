#!/bin/bash

deploy() {
  echo "⌛ Triggered deploy of $1"
  # yarn serverless deploy -f $1 -s $STACK_NAME
}

SCRIPT_PATH=`dirname "$0"`; SCRIPT_PATH=`eval "cd \"$SCRIPT_PATH\" && pwd"`

CONFIG_FILE="$SCRIPT_PATH/.config"
if test -f "$CONFIG_FILE"; then
  source $CONFIG_FILE
  echo "🔍 Finding changed lambdas in $LAMBDA_FOLDER"
else
  echo "No .config file found!"
  fi

GIT_GREP=$(git status --porcelain $LAMBDA_FOLDER | grep -oE  "$LAMBDA_FOLDER\/[A-z]+")
LAMBDAS_CHANGED_PATHS=(${GIT_GREP// / })

DEPLOYED_LAMBDAS=()
for i in "${LAMBDAS_CHANGED_PATHS[@]}"
do
  IFS='/' list=($i)
  LAMBDA_NAME=${list[${#list[@]}-1]}
  if [[ ! " ${DEPLOYED_LAMBDAS[@]} " =~ " ${LAMBDA_NAME} " ]]; then
    DEPLOYED_LAMBDAS+=($LAMBDA_NAME)
    deploy $LAMBDA_NAME &
  fi
done
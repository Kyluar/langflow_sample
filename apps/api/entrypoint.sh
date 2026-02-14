#!/bin/sh
# ATENTION: This file needs to be in LF format to be found inside the container

pnpm db:deploy --cache=local:

pnpm db:seed --cache=local:

pnpm --filter=api prod

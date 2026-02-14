#!/bin/sh
# ATENTION: This file needs to be in LF format to be found inside the container

pnpm --filter=@repo/database db:deploy

pnpm --filter=@repo/database db:seed

pnpm --filter=api prod

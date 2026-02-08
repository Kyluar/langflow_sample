#!/bin/sh

pnpm db:deploy

pnpm db:seed

node apps/api/dist/main

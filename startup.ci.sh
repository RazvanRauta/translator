#!/usr/bin/env bash
set -e

/opt/wait-for-it.sh postgres_test:5432
npx mikro-orm migration:fresh --seed
npm run start:prod 2>&1 | tee &
/opt/wait-for-it.sh server_test:4000
npm run test:e2e:ci -- --runInBand
if [ $? -eq 0 ]
then
  echo "🚀🚀 Tests job succeeded. 🚀🚀"
  exit 0
else
  echo "⚠️ ⚠️ Tests job failed. ⚠️ ⚠️" >&2
  exit 1
fi

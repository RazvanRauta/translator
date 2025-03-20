# Translator API

![e2e workflow](https://github.com/RazvanRauta/translator/actions/workflows/e2e-tests.yml/badge.svg)

### Local

```bash

# 1. Install the project and build packages
pnpm install

# 2. Copy env.example to .env.local and pass wished variables:
cp .env.example .env.local

# 3. Build image:
make docker-build-local

# 4. Run SERVER development process with hot reload in docker container 
make docker-run-local

# 5. Run Migrations after the DB is up and running
npx mikro-orm migration:up
# or
npx mikro-orm migration:fresh --seed # will drop the database, run all migrations and the DatabaseSeeder class

# 6. Optional Run seeds after migrations
npx mikro-orm seeder:run  # also in server folder

# 7. To delete everything run:
make docker-down-local

```

## Swagger Docs

- Swagger Docs can be found here: [Swagger Docs](http://localhost:4000/docs)

## Bruno

- Bruno collection can be found [HERE](./bruno)

## E2E Tests

```bash
# to run the tests, run this command in your terminal:
make docker-run-test

# to delete the test env:
make docker-down-local 
```
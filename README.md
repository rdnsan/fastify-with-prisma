# Fastify with Prisma :sparkles:

## What are we using?

- Fastify - Web Server
- Prisma - Database ORM
- Zod - Request and response validation
- Swagger - API Docs
- TypeScript
- PostgreSQL - Database
- Docker

### Setup Database

```sh
  cd database
  docker-compose up -d
```

### Initialise prisma

```sh
  yarn prisma init --datasource-provider postgresql
```

### Migrate the schema

```sh
  yarn prisma migrate dev --name init
```

---

### dependencies

```sh
  @prisma/client fastify fastify-zod @fastify/jwt @fastify/swagger zod zod-to-json-schema
```

### devDependencies

```sh
  ts-node-dev typescript @types/node eslint prettier prisma
```

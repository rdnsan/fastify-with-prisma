# Fastify with Prisma

## What are we using?

- Fastify - Web Server
- Prisma - Database ORM
- Zod - Request and response validation
- Swagger - API Docs
- TypeScript
- PostgreSQL - Database

### dependencies

```sh
  yarn add @prisma/client fastify fastify-zod zod zod-to-json-schema fastify-jwt fastify-swagger
```

### devDependencies

```sh
  yarn add ts-node-dev typescript @types/node eslint prettier prisma -D
```

### Initialise prisma

```sh
  yarn prisma init --datasource-provider postgresql
```

### Migrate the schema

```sh
  yarn prisma migrate dev --name init
```

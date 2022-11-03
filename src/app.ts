import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import fjwt from '@fastify/jwt';
import swagger from '@fastify/swagger';
import { withRefResolver } from 'fastify-zod';
import userRoutes from './modules/user/user.routes';
import { userSchemas } from './modules/user/user.schema';
import { productSchemas } from './modules/product/product.schema';
import productRoutes from './modules/product/product.routes';
import { version } from '../package.json';

export const server = Fastify({ logger: true });

declare module 'fastify' {
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      id: number;
      email: string;
      name: string;
    };
  }
}

server.register(fjwt, {
  secret: 's3crEtw0rD',
});

server.decorate(
  'authenticate',
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      return reply.send(err);
    }
  }
);

server.get('/health', async (request, response) => {
  return { status: 'OK' };
});

const PORT = 3000;

const main = async () => {
  const schemas = [...userSchemas, ...productSchemas];

  for (const schema of schemas) {
    server.addSchema(schema);
  }

  server.register(
    swagger,
    withRefResolver({
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: false,
      },
      exposeRoute: true,
      staticCSP: true,
      transformStaticCSP: (header) => header,
      openapi: {
        info: {
          title: 'Fastify API',
          description: 'Fastify with Prisma Example',
          version,
        },

        externalDocs: {
          url: 'https://swagger.io',
          description: 'Find more info here',
        },
        servers: [
          {
            url: 'http://localhost',
          },
        ],
      },
    })
  );

  server.register(userRoutes, { prefix: 'api/users' });
  server.register(productRoutes, { prefix: 'api/products' });

  try {
    await server.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();

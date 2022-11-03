import { FastifyReply, FastifyRequest } from 'fastify';
import { CreateProductInput } from './product.schema';
import { createProduct, getProducts } from './product.service';

export const createProductHandler = async (
  request: FastifyRequest<{ Body: CreateProductInput }>,
  reply: FastifyReply
) => {
  const product = await createProduct({
    ...request.body,
    ownerId: request.user.id,
  });

  return product;
};

export const getProductsHandler = async () => {
  const products = await getProducts();
  return products;
};

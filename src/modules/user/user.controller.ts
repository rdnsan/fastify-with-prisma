import { FastifyReply, FastifyRequest } from 'fastify';
import { server } from '../../app';
import { verifyPassword } from '../../utils';
import { CreateUserInput, LoginInput } from './user.schema';
import { createUser, findUserByEmail, findUsers } from './user.service';

export const registerUserHandler = async (
  request: FastifyRequest<{ Body: CreateUserInput }>,
  reply: FastifyReply
) => {
  const body = request.body;
  try {
    const user = await createUser(body);
    return reply.code(201).send(user);
  } catch (err) {
    console.log(err);
    return reply.code(500).send(err);
  }
};

export const loginHandler = async (
  request: FastifyRequest<{ Body: LoginInput }>,
  reply: FastifyReply
) => {
  const body = request.body;

  // find a user by email
  const user = await findUserByEmail(body.email);
  if (!user) {
    return reply.code(401).send({ message: 'Invalid email or password' });
  }

  // verify password
  const correctPassword = verifyPassword({
    candidatePassword: body.password,
    salt: user.salt,
    hash: user.password,
  });

  // generate access token
  if (correctPassword) {
    const { password, salt, ...rest } = user;
    return {
      message: 'Login Success!',
      accessToken: server.jwt.sign(rest),
    };
  }

  return reply.code(401).send({ message: 'Invalid email or password' });
};

export const getUsersHandler = async () => {
  const users = await findUsers();
  return users;
};

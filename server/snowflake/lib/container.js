import dotenv from 'dotenv';
import { createConnection, getRepository } from 'typeorm';
import { User } from '../entity/User';
import { createEntity } from './utils';


dotenv.config();

export default async () => {
  const connection = await createConnection();
  return {
    createEntity,
    connection,
    userRepo: getRepository(User),
    User,
  };
};

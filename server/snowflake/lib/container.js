import dotenv from 'dotenv';
import { createConnection, getRepository } from 'typeorm';
import { createEntity } from './utils';
import { User } from '../entity/User';
import { Comment } from '../entity/Comment';
import { Article } from '../entity/Article';


dotenv.config();

export default async () => {
  const connection = await createConnection();
  return {
    createEntity,
    connection,
    userRepo: getRepository(User),
    User,
    articleRepo: getRepository(Article),
    Article,
    commentRepo: getRepository(Comment),
    Comment,
  };
};

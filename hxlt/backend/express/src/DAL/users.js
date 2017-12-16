import db from './init';
import User from '../entities/User';

export const getUsers = async () => {
  const users = await db.query('select * from users');
  return users.map(user => new User(user.id, user.name, user.password, user.role));
};

export const getUserByID = async (id) => {
  const user = await db.oneOrNone('select * from users where id = $1', id);
  if (!user) return null;

  return new User(user.id, user.name, user.password, user.role);
};

export const getUserByNameNPass = async (name, password) => {
  const user = await db.oneOrNone(`
    select * from users where
      name = $1
      and password = $2
    `, [name, password]);
  if (!user) return null;

  return new User(user.id, user.name, user.password, user.role);
};

export const insertUser = async (name, password, role) => {
  const result = await db.one(
    'insert into users (name, password, role) values ($1, $2, $3) returning id',
    [name, password, role]
  );
  return result.id;
};

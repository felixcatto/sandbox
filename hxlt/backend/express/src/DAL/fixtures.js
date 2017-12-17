import * as udb from './users';
import User from '../entities/User';
import encrypt from '../lib/encrypt';

export const createAdminRole = async () => {
  const users = await udb.getUsers();
  if (users.length !== 0) return;

  udb.insertUser('admin', encrypt('1'), 'admin');
};

import { getConnection } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/User';


export const emptyObject = new Proxy({}, {
  get() {
    return '';
  },
});

export const createEntity = (Entity, fields) => {
  const entity = new Entity();
  Object.keys(fields).forEach((key) => {
    entity[key] = fields[key];
  });
  return entity;
};

export const isEmailUnique = async (email, excludeId = -1) => {
  const users = await getConnection()
    .getRepository(User)
    .createQueryBuilder('user')
    .select(['user.email'])
    .where('user.id != :excludeId', { excludeId })
    .getMany();

  const emails = users.map(el => el.email);
  return !emails.includes(email);
};

export const ivalidate = async (entity) => {
  const errors = await validate(entity);

  return errors
    .reduce((acc, error) => {
      const { constraints } = error;
      const firstErrorMessage = constraints[Object.keys(constraints)[0]];
      return {
        ...acc,
        [error.property]: firstErrorMessage,
      };
    }, {});
};

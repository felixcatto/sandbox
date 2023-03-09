import { getFirstWords } from '../client/lib/utils';

describe('stub', () => {
  it('!', () => {
    const text = '  what who   \nhellomy\n hello who are you\n';
    const result = ['what', 'hellomy', 'hello'];

    expect(getFirstWords(text)).toMatchObject(result);
  });
});

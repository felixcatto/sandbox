import request from 'supertest';
import app from '../src/server';

// test('request', async () => {
//   const res = await request(app).get('/');
//   console.log(322);
//   if (res.error) {
//     throw error;
//   }
//   expect(res.status).toBe(200);
// });


request(app)
  .get('/')
  .expect(200)
  .end((err, res) => {
    if (err) throw err;

    console.log(res.text);
  });

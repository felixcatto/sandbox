const fs = require('fs');

const readFilePs = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (e, content) => {
      if (e) return reject(e);

      return resolve(content.toString());
    });
  });
};

// fs.readFile('fixtures/file4', (e, c) => {
//   if (e) {
//     console.log(e);
//     return;
//   }

//   console.log(c.toString());
// });

// readFilePs('fixtures/file4')
//   .then((content) => {
//     console.log(content);
//   });

Promise.all([readFilePs('fixtures/file4'), readFilePs('fixtures/file5')])
  .then(([content1, content2]) => {
    console.log(content1);
    console.log(content2);
  });


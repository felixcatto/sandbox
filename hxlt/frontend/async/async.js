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

// Promise.all([readFilePs('fixtures/file4'), readFilePs('fixtures/file5')])
//   .then(([content1, content2]) => {
//     const strings1 = content1.split('\n');
//     const strings2 = content2.split('\n');
//     const result = [];
//     const maxLength = strings1.length > strings2.length ? strings1.length : strings2.length;
//     const iToString = str => str === undefined ? null : str;
//     for (let i = 0; i < maxLength; i++) {
//       result.push([iToString(strings1[i]), iToString(strings2[i])]);
//     }

//     console.log(result);
//     return result;
//   });



const compare = (data1, data2) => {
  const lines1 = data1.split('\n').slice(0, -1);
  const lines2 = data2.split('\n').slice(0, -1);
  const result = [];
  const maxLength = lines1.length > lines2.length ? lines1.length : lines2.length;
  const getString = str => str === undefined ? null : str;
  for (let i = 0; i < maxLength; i++) {
    const line1 = getString(lines1[i]);
    const line2 = getString(lines2[i]);
    if (line1 !== line2) {
      result.push([line1, line2]);
    }
  }

  return result;
};

function diff(path1, path2, callback) {
  fs.readFile(path1, (e, data1) => {
    if (e) {
      callback(e);
      return e;
    }

    fs.readFile(path2, (e, data2) => {
      if (e) {
        callback(e);
        return e;
      }

      const result = compare(data1.toString(), data2.toString());
      return callback(null, result);
    });
  });
}

// diff('fixtures/file4', 'fixtures/file5', (err, data) => {
//   console.log(data);
//   // [['text', 'ext'], ['', 'haha'], ['ehu', ''], ['', 'text'], ['aha', null]];
// });








// retry(3, callback =>
//   fs.readFile('file.txt', (err, body) => {
//     callback(err, body);
//   }), (err, result) => {
//     console.log(result);
// });




// execFunc = cb => cb(arg);
// resultFunc = (err, result) => do smthg

const execFunc = (cb) => {
  setTimeout(() => cb('error', 322), 200);
};

const resultFunc = (err, result) => {
  console.log('resultFunc');
  console.log(err, result);
};

function retry(count, execFunc, resultFunc) {
  if (!count) count = 5;

  let calledTimes = 0;
  const cb = (err, result) => {
    console.log('cb');
    console.log(err, result);

    calledTimes += 1;
    if (calledTimes === count) {
      return resultFunc(err, result);
    }

    if (err) {
      return execFunc(cb);
    }

    return resultFunc(err, result);
  };
  execFunc(cb)
}


// retry(0, execFunc, resultFunc);

// let calledTimes = 0;


// retry(0, (callback) => {
//   calledTimes += 1;
//   callback(calledTimes);
// }, () => {
//   console.log(calledTimes);
// });


// retry(6, (callback) => {
//   calledTimes += 1;
//   if (calledTimes === 4) {
//     callback(null, calledTimes);
//     return;
//   }
//   callback(calledTimes);
// }, (err, result) => {
//   console.log(calledTimes);
// });













function concat(list, asyncFn, callback) {
  const promiseFn = (arg) => {
    return new Promise((resolve, reject) => {
      asyncFn(arg, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };

  Promise.all(list.map(el => promiseFn(el)))
    .then((data) => {
      const concatenatedData = data.reduce((acc, el) => acc.concat(el), []);
      console.log(concatenatedData);
      callback(null, concatenatedData);
    })
}


concat(['fixtures/file4', 'fixtures/file5'], fs.readFile, () => {});











// function concat(list, asyncFn, callback) {
//   const promiseFn = (arg) => {
//     return new Promise((resolve, reject) => {
//       asyncFn(arg, (err, result) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   };

//   Promise.all(list.map(el => promiseFn(el)))
//     .then((data) => {
//       callback(data);
//     });
// }
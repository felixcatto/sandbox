import fs from 'fs';

export const readFileSynk = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (e, content) => {
      if (e) return reject(e);

      return resolve(content.toString());
    });
  });
};

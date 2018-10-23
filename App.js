const ipfs = require('./ipfs');

const convertToBuffer = async(file) => {
  let buffer;
  try {
    buffer = await Buffer.from(file);
  } catch (err) {
    console.error(err);
  }
  console.log(buffer);
  return buffer;
};

const main = async() => {
  let result;
  const fileString = JSON.stringify({
    name: 'John',
    surname: 'Doe'
  })
  const bufferedFile = await convertToBuffer(fileString);

  try {
    result =  await ipfs.files.add(bufferedFile);
  } catch(err) {
    console.log(err);
  }

  const hash = result[0].hash;
  const uploadedFile = await ipfs.files.get(hash);
  console.log(uploadedFile[0].content.toString('utf8'));

  ipfs.key.gen('asdasdasd', {
    type: 'rsa',
    size: 2048
  }, (err, key) =>  {
    if (err) {
      console.log({ err });
    } else {
      console.log({ key });
    }
  });

}

main();

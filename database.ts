import mongodb from 'mongodb';
const url = "mongodb://localhost:27017";

function connect(){
  return new Promise( (resolve, reject) => {
    mongodb.connect(
      url,
      function (err, client) {
        if(err) return reject(err)
        return resolve(client.db("spass"))
      }
    );
  })
}

export const db = connect()

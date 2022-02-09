const mongodb = require('mongodb');
const url = "mongodb://localhost:27017/";

function connect(){
  return new Promise( (resolve, reject) => {
    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      function (err, client) {
        if(err) return reject(err)
        return resolve(client.db("spass"))
      }
    );
  })
}

module.exports = connect(); 

const MongoClient = require('mongodb').MongoClient;

const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CONNECTION } = process.env;
const uri = 'NOPE';
const client = new MongoClient(uri, { useNewUrlParser: true });

exports.handler = function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  client.connect(err => {
    client
      .db('my-teams')
      .collection('games')
      .find({})
      .toArray((err, result) => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(result || [])
        });
      });
    client.close();
  });

  return {
    statusCode: 200,
    body: 'Hello, world!'
  };
};

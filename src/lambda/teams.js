require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

// Mongo Connection Config
const { MONGO_USERNAME, MONGO_PASSWORD, MONGO_CONNECTION } = process.env;
const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CONNECTION}`;
const options = { useNewUrlParser: true };

export async function handler(event, context) {
  const client = await MongoClient.connect(uri, options);
  if (!client) return respond('Unable to connect to mongodb', 500);

  try {
    const teams = await client
      .db('my-teams')
      .collection('teams')
      .find({}) // ALL teams - no query
      .toArray();

    return respond(JSON.stringify(teams));
  } catch (err) {
    return respond(err, 500);
  } finally {
    client.close();
  }
}

const respond = (body, statusCode = 200) => ({
  statusCode,
  body
});

const knex = require('knex');

const responseBody = require('./responseBody')

const connectionName = process.env.CONNECTION || 'development';
const connection = require('knexfile')[connectionName];



/**
 * Fetch list of accounts from database and respond with an array of account
 * names.
 */
module.exports = async message => {
  const client = knex(connection);

  try {
    const records = await client('accounts').select();
    console.dir(records)
    
    
  // Build an HTTP response.
  let response = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: responseBody
  };

  return response;
  } finally {
    client.destroy();
  }
};
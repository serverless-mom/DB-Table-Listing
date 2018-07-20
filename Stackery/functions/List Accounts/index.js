const knex = require('knex');

const connectionName = process.env.CONNECTION || 'development';
const connection = require('knexfile')[connectionName];

/**
 * Fetch list of accounts from database and respond with an array of account
 * names.
 */
module.exports = async message => {
  const client = knex(connection);
  console.dir(message)

  try {
    const records = await client('accounts').select();
    console.dir(records)
    
    return records;
  } finally {
    client.destroy();
  }
};
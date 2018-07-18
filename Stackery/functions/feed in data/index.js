const knex = require('knex');

const connectionName = process.env.CONNECTION || 'development';
const connection = require('knexfile')[connectionName];

module.exports = async message => {

  const client = knex(connection);

  try {

    await client('accounts').insert({'name':'CosaNostraPizza','clout':'high'});


  } catch (err) {
    console.error(err.stack);
    return {'success':false};
  } finally {
    client.destroy();
  }


  return {'success':true};
}
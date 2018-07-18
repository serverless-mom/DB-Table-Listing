const knex = require('knex');

const connectionName = process.env.CONNECTION || 'development';
const connection = require('knexfile')[connectionName];
const epsagon = require('@epsagon/epsagon');

epsagon.init({
    token: 'dc6e9e29-66c1-4a5b-a50f-b897da37856b',
    appName: 'tobytest001',
    metadataOnly: false,
});

module.exports = epsagon.lambdaWrapper(async message => {

  const client = knex(connection);

  try {

    await client('accounts').insert({'name':'Void Star Consulting','clout':'low'});


  } catch (err) {
    console.error(err.stack);
    return {'success':false};
  } finally {
    client.destroy();
  }


  return {'success':true};
})


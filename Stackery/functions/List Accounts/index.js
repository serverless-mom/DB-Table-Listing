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
  console.dir(message)

  try {
    const records = await client('accounts').select();
    console.dir(records)
    let header = ''
    let rows = []
    let headingsArray = Object.keys(records[0])
    if (headingsArray.length){
      headingsArray.forEach(headerKey =>{
        header += `<th>${headerKey}</th>`
      })

      records.forEach(item => {
        let recordRow = ''
        headingsArray.forEach(headerKey =>{
          recordRow += `<td>${item[headerKey]}</td>`
        })
        rows.push(`<tr>${recordRow}</tr>`);
      })
    }

    let htmlTable = `<table class='table table-striped' style='display: none'>
    <tr>${header}</tr>
    ${rows.join('')}
</table>`



    
    
  // Build an HTTP response.
  let response = {
    statusCode: 200,
    headers: {
      "Content-Type": "text/html"
    },
    body: htmlTable
  };

  return response;
  } finally {
    client.destroy();
  }
};
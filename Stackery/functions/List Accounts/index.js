const knex = require('knex');

const connectionName = process.env.CONNECTION || 'development';
const connection = require('knexfile')[connectionName];

var iopipe = require('@iopipe/iopipe')({
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlNTIzMmYwZi0yYmIxLTQzZTEtOTljZC1kMmJhNDc2ZWJmOTEiLCJqdGkiOiJjZGVmMmQ3NC1iOGYzLTQzYzgtOTBkNS0yMWNlNzg2NTFhM2QiLCJpYXQiOjE1MzMwNjEzOTMsImlzcyI6Imh0dHBzOi8vaW9waXBlLmNvbSIsImF1ZCI6Imh0dHBzOi8vaW9waXBlLmNvbSxodHRwczovL21ldHJpY3MtYXBpLmlvcGlwZS5jb20vZXZlbnQvLGh0dHBzOi8vZ3JhcGhxbC5pb3BpcGUuY29tIn0.UvWdEuZA8PI2eZmIiJ9YzpkUtzooCR0v1P9iTp61Gas'
});

/**
 * Fetch list of accounts from database and respond with an array of account
 * names.
 */
module.exports = iopipe(async message => {
  const client = knex(connection);
  console.dir(message)
  let table = message.pathParameters.table

  try {
    const records = await client(table).select();
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

    let htmlTable = `<!DOCTYPE html>
    <html lang='en'>
      <head>
        <meta charset='utf-8'>
        <meta http-equiv='X-UA-Compatible' content='IE=edge'>
        <meta name='viewport' content='width=device-width, initial-scale=1'>
        <title>DynamoDB table - ${table}</title>
        <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' integrity='sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u' crossorigin='anonymous'>
      </head>
      <body>  
        <table class='table table-striped'>
        <tr>${header}</tr>
        ${rows.join('')}
    </table>
    </body>
    </html>`

    
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
})
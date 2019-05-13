const config = require('../knexfile.js')
const knex = require('knex')(config)

/*knex.on( 'query', function( queryData ) {
    console.log( queryData );
});*/

knex.migrate.latest([config])
module.exports = knex
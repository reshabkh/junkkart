//var knex = require('knex');

var dbConfig = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'junkkart',
    charset: 'utf8'
  }
}

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
//bookshelf.plugin(require('bookshelf-transaction-manager');
module.exports = bookshelf;

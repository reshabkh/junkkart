//var knex = require('knex');

var dbConfig = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'junkkart',
    charset: 'utf8'
  } || {
    host: 'cig4l2op6r0fxymw.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'mv955787qfjmxxqe',
    password: 'kw87pjc8n0w2hfag',
    database: 'junkkart',
    charset: 'utf8'
  }
}

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);
bookshelf.plugin('registry');
//bookshelf.plugin(require('bookshelf-transaction-manager');
module.exports = bookshelf;

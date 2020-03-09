var mysql = require('mysql');

var connection = mysql.createConnection({
    host: '35.237.204.108',
    user: 'root',
    password: 'toor',
    database:'backstc'
});

exports.connection = connection;
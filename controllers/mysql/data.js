var mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();

var connection = mysql.createConnection({
    host: process.env.HOSTDB,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DATABASE
});

exports.connection = connection;
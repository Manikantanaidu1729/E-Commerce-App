const mysql = require('mysql2');

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root1729',
    database:'estore',
    port:3306,
    multipleStatements:true
});

module.exports = pool;
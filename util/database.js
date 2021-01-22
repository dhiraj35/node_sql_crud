const mysql = require('mysql2');   

const pool = mysql.createPool({  
    host:'10.2.1.6',       
    user:'panther',    
    password:'P@ssw0rd@2020',  
    database:'db_grab_sit',
   // port: '3306',
    
 
});

module.exports = pool.promise();       
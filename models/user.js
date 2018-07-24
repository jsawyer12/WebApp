// var mysql = require('mysql');
// var bcrypt = require('bcryptjs');
//
// var conn = mysql.createConnection({
//   host     : 'localhost',
//   port     : 3306,
//   user     : 'root',
//   password : '$p@r2018U5Xelect123'
// });
//
// // var userSchema =
//
// // console.log('tutto bene? email = ' +email +', password = ' +password);
// conn.connect();
// conn.query('Use UserDB;');
// conn.query('SELECT * FROM ClientData where email=\'' +email +'\' and password=\'' +password +'\';', function (err, rows, fields) {
//   if (rows[0].email == email && rows[0].password == password) {
//     console.log('login credentials valid');
//   }
//   else {
//     console.log('login credentials invalid');
//     next();
//   }
//   // if (err) throw err
// });
// conn.end()

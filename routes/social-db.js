// On utilise notre enveloppe sur node-mysql
var db = require('./db.js');
 
// On veut pouvoir tester la validité des noms de colonnes pour se protéger
// des injections SQL.
var columnNameRegex = /^([a-zA-Z0-9_$]{1,64}\.)?[a-zA-Z0-9_$]{1,64}$/;
function checkColumnName(name) {
    return columnNameRegex.test(name);
}
 
function checkColumns(obj) {
    for (var key in obj) {
        if (!checkColumnName(key)) {
            return false;
        }
    }
    return true;
}

exports.insertUser = function(values, callback) {
    if (checkColumns(values)) {
        db.insert('users', values, callback);
    } else {
        callback('Invalid column name', null);
    }
}

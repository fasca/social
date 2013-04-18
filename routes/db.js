// On utilise le module node-mysql
var mysql = require('mysql');
 
// Module natif filesystem pour lire le fichier de configuration
var fs = require('node-fs');
 
// On utilise fs.readFileSync, qui est un appel bloquant : en effet, cette
// commande ne sera utilisée qu'une fois au chargement de ce module, et nous
// avons besoin des informations contenues dans le fichier pour configurer
// notre client.
var config = JSON.parse(fs.readFileSync('./mysql-config.json'));
 
// On initialise un nouveau client qui exécutera nos requêtes, en lui passant
// l'objet config précédemment initialisé.
var client = new mysql.createConnection(config); 

// On se connecte à la base de données. Un programme node.js ne possède qu'un
// seul thread d'exécution, nous n'avons donc pas besoin de nous inquiéter
// des problèmes de concurrence.
client.connect();
 

client.query('SELECT lastName FROM users WHERE id = 1', function(err, res) {
  if (err) throw err;
  
  console.log('The solution is:', res[0].lastName);
  if(res[0] == "goku")
  	console.log(true);
  else
  	console.log(false);

});


// Nous déclarons quelques fonctions utilitaires
function hashToClause(hash, separator) {
    var result = '';
    var values = [];
    var first = true;
    for (var key in hash) {
        result += (first ? '' : separator) + key + ' = ?';
        values.push(hash[key]);
        first = false;
    }
    return { clause : result, values : values };
}
 
// Nous pouvons à présent écrire les fonctions CRUD qui seront exposées par
// le module
 
// L'insertion prend en paramètres
// - le nom de la table
// - Un hash ayant pour clés les noms de colonnes, pour valeurs les valeurs
// associées respectives
// - Un callback (optionnel) au format function(err, data)
function insert(table, values, callback) {
    // On construit la requête dynamiquement
    var q = 'INSERT INTO ' + table + ' SET ';
    var clause = hashToClause(values, ', ');
    q += clause.clause + ';';
    // On envoie la reqûete avec le callback fourni.
    // Les paramètres dans clause.values sont automatiquement échappés.
    client.query(q, clause.values, callback);
}
 
// La suppression prend en paramètres :
// - La table sur laquelle elle est effectuée
// - Un hash ayant pour clés les colonnes contraintes, pour valeurs les
// contraintes. Les différentes contraintes sont des égalitées liées par des
// 'AND'.
function remove(table, where, callback) {
    var q = 'DELETE FROM ' + table + ' WHERE ';
    var clause = hashToClause(where, ' AND ');
    q += clause.clause;
    client.query(q, clause.values, callback);
}
 
// La lecture prend les mêmes paramètres que la suppression à l'exception
// du troisième qui précise les colonnes qui sont ramenées dans un tableau.
// si le paramètre est null, on exécute un SELECT *
function read(table, where, columns, callback) {
    var columnsClause = (columns ? columns.join(', ') : '*');
    var q = 'SELECT ' + columnsClause + ' FROM ' + table;
    if (where) {
        var clause = hashToClause(where, ' AND ');
        q += ' WHERE ' + clause.clause;
    }
    client.query(q, (where ? clause.values : callback), callback);
}
 
// la mise à jour prend les paramètres suivants :
// - table
// - hash where (identique read, delete)
// - hash values (identique insert)
// - callback
function update(table, where, values, callback) {
    var whereClause = hashToClause(where, ' AND ');
    var valuesClause = hashToClause(values, ' AND ');
    var q = 'UPDATE ' + table + ' SET ' + valuesClause.clause + ' WHERE ' +
        whereClause.clause + ';';
    client.query(q, whereClause.values.concat(valuesClause.values), callback);
}
 
// On expose maintenant les méthodes au travers de l'objet exports
exports.insert = insert;
exports.remove = remove;
exports.read = read;
exports.update = update;
 
// On peut simplifier les opérations courantes (liste, modification via
// l'id, etc.) avec les fonctions suivantes.
exports.updateById = function(table, id, values, callback) {
    update(table, { 'id' : id }, values, callback);
}
 
exports.find = function(table, id, callback) {
    read(table, { 'id' : id }, null, callback);
}
 
exports.removeById = function(table, id, callback) {
    remove(table, { 'id' : id }, callback);
}
 
exports.findAll = function(table, callback) {
    read(table, null, null, callback);
}
 
// Dans certains cas les méthodes CRUD simples ne suffisent pas à obtenir le
// résultat escompté. On donne donc accès à la méthode query pour pouvoir
// utiliser du SQL directement si besoin est.
exports.query = function(query, values, callback) {
    return client.query(query, values, callback);
}

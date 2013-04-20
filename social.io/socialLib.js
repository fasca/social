var socialLib = (function () {
    function socialLib(sql) {
        this.users = require("./users.js");
        this.sql = sql;
        sql.connect();
    }
    return socialLib;
})();
exports = socialLib;

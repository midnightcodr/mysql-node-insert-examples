const mysql = require('mysql2/promise')
module.exports = () => {
	return mysql.createConnection(require('./settings').dbOpts)
}

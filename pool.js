const mysql = require('mysql2/promise')
module.exports = () => {
	return mysql.createPool(require('./settings').dbOpts)
}

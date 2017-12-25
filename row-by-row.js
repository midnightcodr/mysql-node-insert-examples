const Promise = require('bluebird')
const Settings = require('./settings')
const db = require('./db')

const run = async () => {
	console.time('prepare')
	const records = Array(Settings.maxRows).fill().map((e,i)=>[i+1, `user${i}`]);
	console.timeEnd('prepare')

	console.time('insert')
	const conn = await db()
	const stmt = `insert into ${Settings.table} values ?`
	await conn.query(`truncate table ${Settings.table}`)
	await Promise.each(records, r => {
		return conn.query(stmt, [[r]])
	})
	await conn.end()
	console.timeEnd('insert')
}
run()

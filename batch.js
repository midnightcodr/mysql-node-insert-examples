const bluebird = require('bluebird')
const Settings = require('./settings')
const db = require('./db')
const Bulk = require('./BulkClass')
const batch = 50000

const run = async () => {
    console.time('prepare')
    const records = Array(Settings.maxRows).fill().map((e,i)=>[i+1, `user${i}`]);
    console.timeEnd('prepare')

    console.time('insert')
    const conn = await db()
    const query = `insert into ${Settings.table} values ?`
    const bulk = Bulk({
        conn,
        batch,
        query
    })
    await conn.query(`truncate table ${Settings.table}`)
    await bluebird.each(records, r => {
        return bulk.add(r)
    })
    await bulk.flush()
    await conn.end()
    console.timeEnd('insert')
}

run()

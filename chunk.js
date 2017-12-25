const _ = require('lodash')
const bluebird = require('bluebird')
const Settings = require('./settings')
const db = require('./pool')
const batch = 25000
const concurrency = 3

const run = async () => {
    console.time('prepare')
    const records = Array(Settings.maxRows).fill().map((e,i)=>[i+1, `user${i}`]);
    console.timeEnd('prepare')

    console.time('insert')
    const conn = await db()
    const query = `insert into ${Settings.table} values ?`

    const tasks = _.chunk(records, batch)
    await bluebird.map(tasks, task => {
        return conn.query(query, [task])
    }, { concurrency })
    await conn.end()
    console.timeEnd('insert')
}

run()

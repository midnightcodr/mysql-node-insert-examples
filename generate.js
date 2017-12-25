const fs = require('fs')
const out = fs.createWriteStream('/tmp/data.csv')
console.time('prepare')
const records = Array(1000000).fill().map((e,i)=>i);
records.forEach(i => {
    out.write(`${i},user${i}\n`)
})
console.timeEnd('prepare')

## Setup
1. Create table tblUsers with structure from [tblUsers.sql](tblUsers.sql)

2. `npm i`

## Run the tests
```
time node <script_name.js>
```
where `script_name` is one of ['row-by-row', 'batch', 'chunk']. Please note `row-by-row.js` might take a very long time to run. It took ~15 minutes for my i7 2760qm/8G ram laptop to run.

For `load data local infile` test, you can use [generate.js](generate.js) to generate the csv file.
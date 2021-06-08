// This is meant to be run in nodejs to sort maps.json by alphabetical order.
const fs = require('fs');

const maps = require('./maps.json');

maps.sort((a, b) => a.name.localeCompare(b.name));

const mapsOutJson = JSON.stringify(maps, null, 4);
fs.writeFile('maps.json', mapsOutJson, ()=>{});

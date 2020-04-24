// This is meant to be run in nodejs to sort maps.json by alphabetical order.
const fs = require('fs');

const mapsInJson = fs.readFileSync('unsorted.json');
const mapsIn = JSON.parse(mapsInJson);

var array = [];
for(map in mapsIn){
    array.push(mapsIn[map]);
}
array.sort((a, b) => (a.name > b.name) ? 1 : -1);

var mapsOut = {};
for(i = 0; i < array.length; i++){
    mapsOut[String(i)] = array[i];
}

const mapsOutJson = JSON.stringify(mapsOut, null, 4);
fs.writeFileSync('maps.json', mapsOutJson);

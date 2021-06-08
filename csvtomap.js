const fs = require('fs');

const csvFile = fs.readFileSync('map.csv', 'utf-8');

var maps = [
    {
        "name": null,
        "authors": [
            null
        ],
        "width": 1,
        "height": 1,
        "maps": []
    }
]

const ids = [];

const lines = csvFile.split('\n');
for(y = 0; y < lines.length; y++){
    if(lines[y].length == 0) continue;
    var cells = lines[y].split(',');
    for(x = 0; x < cells.length; x++){
        if(!ids.includes(cells[x])) ids.push(cells[x]);
        maps[0].maps.push({
            x,
            y,
            id: cells[x]
        });
        if(x+1 > maps[0].width) maps[0].width = x+1;
    }
    if(y+1 > maps[0].height) maps[0].height = y+1;
}

console.log(JSON.stringify(maps, null, 4));
for(id of ids){
    // console.log('Moving', id);
    // fs.renameSync(`temp/${id}.bin`, `maps/${id}.bin`);
    console.log(id);
}
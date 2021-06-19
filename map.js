async function getMapData(mapId){
    const mapResponse = await fetch(`maps/${mapId}.bin`);
    const mapDataBuffer = await mapResponse.arrayBuffer();
    const mapData = new Uint8ClampedArray(mapDataBuffer);
    return mapData;
}

function drawMap(map){
    if(map.nsfw && !localStorage.allowNSFW){
        if(!confirm("This map is NSFW, do you accept to view NSFW maps?\n\nYour choice will be remembered.")){
            return;
        }else localStorage.allowNSFW = true;
    }
    map.maps.forEach(async mapPiece =>{
        (async function(){
            const selectedMapData = await getMapData(mapPiece.id);
            const selectedMapImage = renderImage(selectedMapData);
            printImage(canvas, selectedMapImage, quality.value, mapPiece.x, mapPiece.y);
        })();
    });
}
async function getMapData(mapId){
    const mapResponse = await fetch(`maps/${mapId}.bin`);
    const mapDataBuffer = await mapResponse.arrayBuffer();
    const mapData = new Uint8ClampedArray(mapDataBuffer);
    return mapData;
}

function drawMap(map){
    map.maps.forEach(async mapPiece =>{
        (async function(){
            const selectedMapData = await getMapData(mapPiece.id);
            const selectedMapImage = renderImage(selectedMapData);
            printImage(canvas, selectedMapImage, quality.value, mapPiece.x, mapPiece.y);
        })();
    });
}
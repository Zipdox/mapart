async function getMapData(mapId){
    const mapResponse = await fetch(`maps/${mapId}.bin`);
    const mapDataBuffer = await mapResponse.arrayBuffer();
    const mapData = new Uint8ClampedArray(mapDataBuffer);
    return mapData;
}
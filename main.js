window.onload = async function(){
    // Object.defineProperty(Array.prototype, 'chunk_inefficient', {
    //     value: function(chunkSize) {
    //         var array = this;
    //         return [].concat.apply([],
    //         array.map(function(elem, i) {
    //             return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
    //         })
    //         );
    //     }
    // });
    const mapJson = await fetch('maps.json');
    const mapData = await mapJson.json();
    // const testMapData = await getMapData(mapData[0]);
    // console.log(testMapData);

    var mapslist = document.getElementById('maps');
    var scaleSlider = document.getElementById('scale');
    var canvas = document.getElementById('map');
    var maptitle = document.getElementById('maptitle');
    
    for(map in mapData){
        var helperOption = document.createElement('option');
        helperOption.value = map;
        helperOption.innerHTML = mapData[map].name;
        mapslist.appendChild(helperOption);
    }

    mapslist.onchange = async function(){
        if(this.value == ''){
            clearCanvas(canvas);
            return;
        }
        const selectedMap = mapData[this.value];
        maptitle.innerHTML = selectedMap.name;
        sizeCanvas(selectedMap.width, selectedMap.height, scaleSlider.value)
        for(mapPiece of selectedMap.maps){
            const selectedMapData = await getMapData(mapPiece.id);
            const selectedMapImage = renderImage(selectedMapData);
            printImage(canvas, selectedMapImage, scaleSlider.value, mapPiece.x, mapPiece.y);
        }
        const selectedMapData = await getMapData(selectedMap);
        const testimagedata = renderImage(selectedMapData);
        printImage(canvas, testimagedata, scaleSlider.value);
    }
    scaleSlider.onchange = async function(){
        const selectedMap = mapData[mapslist.value];
        maptitle.innerHTML = selectedMap.name;
        sizeCanvas(selectedMap.width, selectedMap.height, scaleSlider.value)
        for(mapPiece of selectedMap.maps){
            const selectedMapData = await getMapData(mapPiece.id);
            const selectedMapImage = renderImage(selectedMapData);
            printImage(canvas, selectedMapImage, scaleSlider.value, mapPiece.x, mapPiece.y);
        }
        const selectedMapData = await getMapData(selectedMap);
        const testimagedata = renderImage(selectedMapData);
        printImage(canvas, testimagedata, scaleSlider.value);
    }    
}
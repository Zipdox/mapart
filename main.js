window.onload = async function(){

    const mapJson = await fetch('maps.json');
    const mapData = await mapJson.json();

    var mapslist = document.getElementById('maps');
    var scaleSlider = document.getElementById('scale');
    var canvas = document.getElementById('map');
    var maptitle = document.getElementById('maptitle');
    var mapauthor = document.getElementById('author');
    
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
        mapauthor.innerHTML = selectedMap.authors.join(', ');
        sizeCanvas(selectedMap.width, selectedMap.height, scaleSlider.value)
        for(mapPiece of selectedMap.maps){
            const selectedMapData = await getMapData(mapPiece.id);
            const selectedMapImage = renderImage(selectedMapData);
            printImage(canvas, selectedMapImage, scaleSlider.value, mapPiece.x, mapPiece.y);
        }
    }
    scaleSlider.onchange = async function(){
        if(mapslist.value == '') return;
        const selectedMap = mapData[mapslist.value];
        maptitle.innerHTML = selectedMap.name;
        mapauthor.innerHTML = selectedMap.authors.join(' ');
        sizeCanvas(selectedMap.width, selectedMap.height, scaleSlider.value)
        for(mapPiece of selectedMap.maps){
            const selectedMapData = await getMapData(mapPiece.id);
            const selectedMapImage = renderImage(selectedMapData);
            printImage(canvas, selectedMapImage, scaleSlider.value, mapPiece.x, mapPiece.y);
        }
    }    
}
window.onload = async function(){

    const mapJson = await fetch('maps.json');
    window.mapData = await mapJson.json();

    window.mapslist = document.getElementById('maps');
    window.scaleSlider = document.getElementById('scale');
    window.canvas = document.getElementById('map');
    window.maptitle = document.getElementById('maptitle');
    window.mapAuthor = document.getElementById('author');
    window.searchBar = document.getElementById('search');
    
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
        mapAuthor.innerHTML = selectedMap.authors.join(', ');
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
        mapAuthor.innerHTML = selectedMap.authors.join(' ');
        sizeCanvas(selectedMap.width, selectedMap.height, scaleSlider.value)
        for(mapPiece of selectedMap.maps){
            const selectedMapData = await getMapData(mapPiece.id);
            const selectedMapImage = renderImage(selectedMapData);
            printImage(canvas, selectedMapImage, scaleSlider.value, mapPiece.x, mapPiece.y);
        }
    }
    searchBar.addEventListener("keyup", function(event) {
        const searchResults = searchObject(mapData, this.value);
        for(i = mapslist.children.length - 1; i>=0; i--){
            if(mapslist[i].value != "") mapslist[i].remove();
        }
        for(map in searchResults){
            var helperOption = document.createElement('option');
            helperOption.value = map;
            helperOption.innerHTML = mapData[map].name;
            mapslist.appendChild(helperOption);
        }
    });
}
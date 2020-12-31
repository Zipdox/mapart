window.onload = async function(){

    const mapJson = await fetch('maps.json');
    window.mapData = await mapJson.json();

    window.mapslist = document.getElementById('maptable');
    window.quality = document.getElementById('quality');
    window.canvas = document.getElementById('map');
    window.maptitle = document.getElementById('maptitle');
    window.mapAuthor = document.getElementById('author');
    window.searchBar = document.getElementById('search');
    
    for(map in mapData){
        const entry = createEntry(mapData[map]);
        mapslist.appendChild(entry);
    }

    quality.onchange = async function(){
        if(shownMap == undefined) return;
        maptitle.innerHTML = shownMap.name;
        window.location.hash = "#" + encodeURIComponent(shownMap.name);
        mapAuthor.innerHTML = shownMap.authors.join(' ');
        sizeCanvas(shownMap.width, shownMap.height, quality.value);
        for(mapPiece of shownMap.maps){
            const selectedMapData = await getMapData(mapPiece.id);
            const selectedMapImage = renderImage(selectedMapData);
            printImage(canvas, selectedMapImage, quality.value, mapPiece.x, mapPiece.y);
        }
    }

    searchBar.addEventListener("keyup", function(event) {
        for(i = mapslist.children.length - 1; i>=0; i--){
            if(mapslist.children[i].className == "entry") mapslist.children[i].remove();
        }
        for(map in mapData){
            const selectedMap = mapData[map];
            const queryWords = this.value.toLowerCase().split(' ');
            var match = true;
            for(word of queryWords){
                if(!selectedMap.name.toLowerCase().includes(word) && !selectedMap.authors.join(' ').toLowerCase().includes(word)) match = false;
            }
            if(match){
                const entry = createEntry(selectedMap);
                mapslist.appendChild(entry);
            }
            
        }
    });
    
    canvas.onclick = function(){
        const downloadLink = document.createElement('a');
        downloadLink.href = this.toDataURL("image/png");
        downloadLink.download = window.maptitle.textContent + '.png';
        downloadLink.click();
    }

    const urlID = window.location.hash.slice(1);
    if(urlID.length > 0){
        decodedUrlID = decodeURIComponent(urlID);
        var foundMap;
        for(mapNum in mapData){
            if(mapData[mapNum].name == decodedUrlID){
                foundMap = mapNum;
                break;
            }
        }
        if(foundMap != undefined){
            const selectedMap = mapData[foundMap];
            window.shownMap = selectedMap;
            maptitle.innerHTML = selectedMap.name;
            mapAuthor.innerHTML = selectedMap.authors.join(', ');
            sizeCanvas(selectedMap.width, selectedMap.height, quality.value);
            for(mapPiece of selectedMap.maps){
                const selectedMapData = await getMapData(mapPiece.id);
                const selectedMapImage = renderImage(selectedMapData);
                printImage(canvas, selectedMapImage, quality.value, mapPiece.x, mapPiece.y);
            }
        }
        
    }
}
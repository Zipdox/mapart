function createEntry(selectedMap){
    const entry = document.createElement('tr');
    entry.className = "entry";
    const entryTitle = entry.insertCell();
    entryTitle.textContent = selectedMap.name;
    const entryAuthors = entry.insertCell();
    entryAuthors.textContent = selectedMap.authors.join(', ');
    const entrySize = entry.insertCell();
    entrySize.textContent = `${selectedMap.width}×${selectedMap.height}`;

    entry.onclick = async function(){
        maptitle.innerHTML = selectedMap.name;
        mapAuthor.innerHTML = selectedMap.authors.join(', ');
        if(!sizeCanvas(selectedMap.width, selectedMap.height, quality.value)) return;
        for(mapPiece of selectedMap.maps){
            const selectedMapData = await getMapData(mapPiece.id);
            const selectedMapImage = renderImage(selectedMapData);
            printImage(canvas, selectedMapImage, quality.value, mapPiece.x, mapPiece.y);
        }
        window.shownMap = selectedMap;
        window.location.hash = "#" + encodeURIComponent(selectedMap.name);
    }
    return entry;
}
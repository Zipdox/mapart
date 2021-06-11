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
        mapAuthor.textContent = 'By ' + selectedMap.authors.join(', ');
        if(!sizeCanvas(selectedMap.width, selectedMap.height, quality.value)) return;
        drawMap(selectedMap);
        window.shownMap = selectedMap;
        window.location.hash = "#" + encodeURIComponent(selectedMap.name).replace(/\./g, '%2e');
    }
    return entry;
}
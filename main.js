window.onload = async function(){

    const mapJson = await fetch('maps.json');
    window.mapData = await mapJson.json();

    window.acceptLargeMap = false;
    
    window.mapslist = document.getElementById('maptable');
    window.quality = document.getElementById('quality');
    window.canvas = document.getElementById('map');
    window.maptitle = document.getElementById('maptitle');
    window.mapAuthor = document.getElementById('author');
    window.searchBar = document.getElementById('search');

    window.sortByName = document.getElementById('sortByName');
    window.sortByAuthors = document.getElementById('sortByAuthors');
    window.sortBySize = document.getElementById('sortBySize');

    var invertSort = {name: false, authors: false, size: false};
    function sortBy(maps){
        sortedMaps = [...maps];
        updateTableHeaders();
        switch(sortParameter){
            case 'name':
                if(!invertSort.name){
                    sortedMaps.sort((a, b) => a.name.localeCompare(b.name));
                }else{
                    sortedMaps.sort((a, b) => -a.name.localeCompare(b.name));
                }
                break;
            case 'authors':
                if(!invertSort.authors){
                    sortedMaps.sort((a, b) => a.authors.join(', ').localeCompare(b.authors.join(', ')));
                }else{
                    sortedMaps.sort((a, b) => -a.authors.join(', ').localeCompare(b.authors.join(', ')));
                }
                break;
            case 'size':
                if(!invertSort.size){
                    sortedMaps.sort((a, b) => (a.width * a.height > b.width * b.height) ? 1 : -1);
                }else{
                    sortedMaps.sort((a, b) => (a.width * a.height < b.width * b.height) ? 1 : -1);
                }
                break;
            default:
                return;
        }
        return sortedMaps;
    }

    function loadTable(maps){
        for(i = mapslist.children.length - 1; i>=0; i--){
            if(mapslist.children[i].className == "entry") mapslist.children[i].remove();
        }
        for(map of maps){
            const entry = createEntry(map);
            mapslist.appendChild(entry);
        }
    }

    window.sortParameter = 'name';
    window.currentMaps = sortBy(mapData);
    invertSort.name = !invertSort.name;

    function updateTableHeaders(){
        sortByName.textContent = 'Title';
        sortByAuthors.textContent = 'Authors';
        sortBySize.textContent = 'Size';
        switch(sortParameter){
            case 'name':
                if(!invertSort.name) sortByName.textContent = 'Title↓'
                else sortByName.textContent = 'Title↑';
                break;
            case 'authors':
                if(!invertSort.authors) sortByAuthors.textContent = 'Authors↓'
                else sortByAuthors.textContent = 'Authors↑';
                break;
            case 'size':
                if(!invertSort.size) sortBySize.textContent = 'Size↓'
                else sortBySize.textContent = 'Size↑';
                break;
            default:
                break;
        }
    }

    loadTable(currentMaps);

    sortByName.onclick = function(){
        if(sortParameter != 'name') invertSort.name = false;
        sortParameter = 'name';
        loadTable(sortBy(currentMaps));
        invertSort.name = !invertSort.name;
    }
    sortByAuthors.onclick = function(){
        if(sortParameter != 'authors') invertSort.authors = false;
        sortParameter = 'authors';
        loadTable(sortBy(currentMaps));
        invertSort.authors = !invertSort.authors;
    }
    sortBySize.onclick = function(){
        if(sortParameter != 'size') invertSort.size = false;
        sortParameter = 'size';
        loadTable(sortBy(currentMaps));
        invertSort.size = !invertSort.size;
    }

    quality.onchange = async function(){
        if(shownMap == undefined) return;
        maptitle.innerHTML = shownMap.name;
        mapAuthor.textContent = 'By ' + shownMap.authors.join(', ');
        if(!sizeCanvas(shownMap.width, shownMap.height, quality.value)) return;
        drawMap(shownMap);
        window.location.hash = "#" + encodeURIComponent(shownMap.name);
    }

    searchBar.onkeyup = function(){
        if(window.searchTimeout) clearTimeout(searchTimeout);
        window.searchTimeout = setTimeout(function(){
            for(i = mapslist.children.length - 1; i>=0; i--){
                if(mapslist.children[i].className == "entry") mapslist.children[i].remove();
            }
            var mapResults = [];
            for(selectedMap of mapData){
                const queryWords = searchBar.value.toLowerCase().split(' ');
                var match = true;
                for(word of queryWords){
                    if(!selectedMap.name.toLowerCase().includes(word) && !selectedMap.authors.join(', ').toLowerCase().includes(word)) match = false;
                }
                if(match) mapResults.push(selectedMap);
            }
            currentMaps = mapResults;
            loadTable(sortBy(mapResults));
        }, 500);
    }
    
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
        for(map of mapData){
            if(map.name == decodedUrlID){
                foundMap = map;
                break;
            }
        }

        if(foundMap == undefined) return;

        window.shownMap = foundMap;
        maptitle.innerHTML = foundMap.name;
        mapAuthor.textContent = 'By ' + foundMap.authors.join(', ');
        sizeCanvas(foundMap.width, foundMap.height, quality.value);
        drawMap(foundMap);
    }
}

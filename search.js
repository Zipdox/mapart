function searchObject(searchObject, query){
    const queryWords = query.toLowerCase().split(' ');
    var returnObject = {};
    for(property in searchObject){
        var item = searchObject[property];
        var match = true;
        for(word of queryWords){
            if(!item.name.toLowerCase().includes(word) && !item.authors.join(' ').toLowerCase().includes(word)) match = false;
        }
       if(match) returnObject[property] = item;
    }
    return returnObject;
}
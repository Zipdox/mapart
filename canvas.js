function clearCanvas(canvas){
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 128, 128);
}

const pixelLimit = 2**24;

function sizeCanvas(width, height, scale){
    const pixels = width*height*128*128*scale*scale;
    console.log(pixels);
    if(pixels > pixelLimit && window.acceptLargeMap == false){
        if(!confirm("You're about to load a very large map, this might crash your browser. Do you wish to continue?\n\nYou can turn down the render resolution to make it faster.")){
            return false;
        }else{
            window.acceptLargeMap = true;
        }
    }
    var canvas = document.getElementById('map');
    canvas.width = 128*scale*width;
    canvas.height = 128*scale*height;
    return true;
}
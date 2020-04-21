function sizeCanvas(width, height, scale){
    var canvas = document.getElementById('map');
    canvas.width = 128*scale*width;
    canvas.height = 128*scale*height;
}
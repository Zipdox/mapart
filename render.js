function renderImage(mapColorData){
    var imagePixelArray = new Uint8ClampedArray(128*128*4);
    for(pixelIndex = 0; pixelIndex < 16384; pixelIndex++){

        var pixelColor = mapColors[mapColorData[pixelIndex]];
        imagePixelArray.set(pixelColor, pixelIndex*4);
        imagePixelArray[pixelIndex*4+3] = 255;
    }
    return new ImageData(imagePixelArray, 128, 128);
}

function printImage(canvas, imageData, scale, x=0, y=0){
    if(scale == undefined) scale = 1;
    var helpercanvas = document.createElement('canvas');
    helpercanvas.width = helpercanvas.height = 128;
    var helperctx = helpercanvas.getContext('2d');
    helperctx.putImageData(imageData, 0, 0);

    var ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(helpercanvas, x*128*scale, y*128*scale, 128*scale, 128*scale);
    
    helpercanvas.remove();
}

// function drawImage(canvas, scaling, map){
//     const imageData = map.chunk_inefficient(128);
//     var ctx = canvas.getContext("2d");
//     for(horizontal = 0; horizontal < 128; horizontal++){
//         for(vertical = 0; vertical < 128; vertical++){
//             ctx.fillStyle = oldMapColors[imageData[horizontal][vertical]];
//             ctx.fillRect(vertical*scaling,horizontal*scaling,scaling,scaling);
//         }
//     }
// }
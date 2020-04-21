function clearCanvas(canvas){
    canvas.width = canvas.height = 128;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 128, 128);
}

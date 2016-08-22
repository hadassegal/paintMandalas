/**
 * Created by Hadas on 19/08/2016.
 */

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
canvas.width=canvas.offsetWidth;
canvas.height= canvas.offsetHeight;

var drawing = false;
var lineWidth=2;
var numMirrors=20;
var mirrorOn = true;
var originX=canvas.width/2;
var originY=canvas.height/2;
var canvasCenterX=canvas.width/2;
var canvasCenterY=canvas.height/2;
var prev;
var newOrigin=false;
var penColor= "red";
//canvas.width=window.innerWidth;
//canvas.height=window.innerHeight;

function setMirrors(){
    numMirrors = document.getElementById('mandala_mirrors').value;
}

var line = function(x1, y1, x2, y2, context){
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
}

function drawMandala(prev, curr, n, context){
    var n=numMirrors;
    var centerX = originX;
    var centerY = originY;
    for (var i = 0; i < n; i++)
    {
        context.save();
        var theta = i * 2 * Math.PI / n;
        context.translate(centerX, centerY);
        context.rotate(theta);
        context.translate(-centerX, -centerY);
        //line(x1, y1, x2, y2, context)
        drawLine(prev, curr, context);
        context.restore();
    }
}

function rotatedLines(x1, y1, x2, y2, n, context)
{
    var n=numMirrors;
    var centerX = originX;
    var centerY = originY;
    for (var i = 0; i < n; i++)
    {
        context.save()
        var theta = i * 2 * Math.PI / n
        context.translate(centerX, centerY)
        context.rotate(theta)
        context.translate(-centerX, -centerY)
        line(x1, y1, x2, y2, context)
        context.restore()
    }
}

function getLineWidth() {
    lineWidth = document.getElementById('line_width').value;
    return lineWidth;
}

function setLineWidth(){
    lineWidth = document.getElementById('line_width').value;
}

var mouseDown = function(e){
    if (newOrigin){
        originX= e.offsetX;
        originY = e.offsetY;
    }

    prev = e;
    drawing = true;
    /* Draw dot
    var r = getLineWidth() / 2;
    context.beginPath();
    context.arc(e.offsetX+0.5, e.offsetY+0.5, r, 0.001, 0, false);
    context.fill();
    */
    //context.moveTo(e.offsetX, e.offsetY);
}

var drawLine = function(prev, curr, context){
    context.lineWidth = lineWidth;
    context.beginPath();
    context.moveTo(prev.offsetX, prev.offsetY);
    context.lineTo(curr.offsetX, curr.offsetY);
    context.stroke();
}



var draw = function(e){
    if (drawing){
        context.lineWidth=lineWidth;
		context.strokeStyle = setColor();
        drawLine(prev, e, context);
        if (mirrorOn){
            drawMandala(prev, e, numMirrors, context);
            rotatedLines(2*originX - prev.offsetX, prev.offsetY, 2*originX - e.offsetX, e.offsetY, numMirrors, context)
        }
        prev=e;
    }
}

var mouseMove = function(e){
    draw(e);
}

var mouseUp = function() {
    drawing = false;
    context.beginPath();
}

var clearCanvas = function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
}

var centerOrigin = function()
{
    newOrigin=false;
    originX=canvasCenterX;
    originY=canvasCenterY;
}

var setOrigin = function(e){
    newOrigin=true;
}

var setColor = function(){
	penColor=document.getElementById('color').value;
	return penColor;
}

canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mousemove', mouseMove);
canvas.addEventListener('mouseup', mouseUp);
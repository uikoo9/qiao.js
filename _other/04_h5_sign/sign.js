var width = document.body.clientWidth;
var height = document.body.clientHeight;

console.log(width + '-' + height);

var canvas = document.getElementById('canvasEdit');

canvas.width = width;
canvas.height = 500;

// pc
canvas.addEventListener('mousemove', onMouseMove, false);
canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mouseup', onMouseUp, false);

// mobi
canvas.addEventListener('touchmove', onMouseMove, false);
canvas.addEventListener('touchstart', onMouseDown, false);
canvas.addEventListener('touchend', onMouseUp, false);

var context = canvas.getContext('2d');

var linex = new Array();
var liney = new Array();
var linen = new Array();
var lastX = 1;
var lastY = 30;
var flag = 0;

function onMouseMove(evt){
	if (flag == 1){
		linex.push(evt.layerX);
		liney.push(evt.layerY);
		linen.push(1);
		context.save();
		context.translate(context.canvas.width / 2, context.canvas.height / 2);
		context.translate(-context.canvas.width / 2 , -context.canvas.height/2 - 33);
		context.beginPath();
		context.lineWidth = 2;
		for (var i = 1; i < linex.length; i++){
			lastX = linex[i];
			lastY = liney[i];
			if (linen[i] == 0)
				context.moveTo(lastX, lastY);
			else
				context.lineTo(lastX, lastY);
		}
		//context.strokeStyle = 'hsl(50%, 50%, 50%)';
		//context.shadowColor = 'white';
		context.shadowBlur = 10;
		context.stroke();
		context.restore();
	}
}

function onMouseDown(evt){
	flag = 1;
	linex.push(evt.layerX);
	liney.push(evt.layerY);
	linen.push(0);
}

function onMouseUp(evt){
	flag = 0;
	linex.push(evt.layerX);
	liney.push(evt.layerY);
	linen.push(0);
}

// 重画
function rewrite(){	
	linex = new Array();
	liney = new Array();
	linen = new Array();
	context.clearRect(0,0,canvas.width,canvas.height);
	preview();
}

function preview(){
	var show=document.getElementById("previewShow");
	show.innerHTML="";
	show.appendChild(convertCanvasToImage(canvas));
}

function convertCanvasToImage(canvas){
	var image=new Image();
	image.width=width;
	image.height=500;
	image.src=canvas.toDataURL("image/png");
	return image;
}
const WIDTH = 360;
const HEIGHT = 640;
const BOX_SIDE = 50;
const MARGIN = 10;

var components = [];

function initialize(){
	gameArea.start();
	generateNewRow();
	for (i = 0; i<components.length; i++){
		components[i].render();
	}
}

function generateNewRow(){
	for (i = 0; i<7; i++){
		components.push(new Box(i, 1));
	}
}

var gameArea = {
	canvas : document.createElement("canvas"),
	start : function(){
		this.canvas.width = 360;
		this.canvas.height = 640;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[2]);
	},
	update : function(){
		console.log("update");
	},
	render : function(){
		console.log("render");
	}
}

function Box(column, level){
	this.width = BOX_SIDE;
	this.height = BOX_SIDE;
	this.x = MARGIN/2 + BOX_SIDE*column;
	this.y = BOX_SIDE;
	this.render = function(){
		ctx = gameArea.context;
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = "1";
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.stroke();
		ctx.font = "30px Arial";
		ctx.fillStyle = "white";
		var size = ctx.measureText(level.toString());
		ctx.fillText(level.toString(),this.x+(this.width-size.width)/2,this.y+(this.height+30)/2);
	}
}
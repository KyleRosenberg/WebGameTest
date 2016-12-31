const WIDTH = 360;
const HEIGHT = 640;
const BOX_SIDE = 50;
const BALL_RADIUS = BOX_SIDE/6;
const MARGIN = 10;

var components = [];
var scoreComponent;
var startBall;
var GameState = "Inputting";
var level = 1;

function initialize(){
	gameArea.start();
	scoreComponent = new Score();
	components.push(scoreComponent);
	startBall = new Ball(WIDTH/2, BOX_SIDE*10, "grey", "grey", "start");
	components.push(startBall);
	generateNewRow();
}

function clickTest(){
	GameState = "Shifting";
	level+=1;
}

function generateNewRow(){
	for (i = 0; i<7; i++){
		components.push(new Box(i, level));
	}
}

function tickGame(){
	gameArea.update();
	gameArea.render();
}

var gameArea = {
	canvas : document.createElement("canvas"),
	start : function(){
		this.canvas.width = 360;
		this.canvas.height = 640;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.canvas, document.body.childNodes[2]);
		this.interval = setInterval(tickGame, 20);
	},
	update : function(){
		if (GameState=="Shifting"){
			for (i = 0; i<components.length; i++){
				if (components[i] instanceof Box){
					var box = components[i];
					box.y+=1;
					if (box.y%BOX_SIDE==0){
						GameState = "Generating";
					}
				}
			}
		} else if (GameState=="Generating"){
			generateNewRow();
			GameState = "Inputting";
		}
	},
	render : function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		for (i = 0; i<components.length; i++){
			components[i].render();
		}
	}
}

function Score(){
	this.x = 0;
	this.y = 0;
	this.width = gameArea.canvas.width;
	this.height = BOX_SIDE;
	this.render = function(){
		ctx = gameArea.context;
		ctx.font = "40px Verdana";
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		var size = ctx.measureText("Score: " + level.toString());
		ctx.fillText("Score: " + level.toString(),this.x+(this.width-size.width)/2,this.y+this.height-10);
		ctx.strokeText("Score: " + level.toString(),this.x+(this.width-size.width)/2,this.y+this.height-10);
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.moveTo(this.x, this.y + this.height);
		ctx.lineTo(this.x + this.width, this.y + this.height);
		ctx.stroke();
		ctx.beginPath();
		ctx.moveTo(this.x, this.y + this.height*10);
		ctx.lineTo(this.x + this.width, this.y + this.height*10);
		ctx.stroke();
	}
}

function Box(column, level){
	this.width = BOX_SIDE;
	this.height = BOX_SIDE;
	this.x = MARGIN/2 + BOX_SIDE*column;
	this.y = BOX_SIDE*2;
	this.count = level;
	this.render = function(){
		ctx = gameArea.context;
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.beginPath();
		ctx.strokeStyle = "black";
		ctx.lineWidth = "1";
		ctx.rect(this.x, this.y, this.width, this.height);
		ctx.stroke();
		ctx.font = "30px Verdana";
		ctx.fillStyle = "white";
		var size = ctx.measureText(this.count.toString());
		ctx.fillText(level.toString(),this.x+(this.width-size.width)/2,this.y+(this.height)/2+12);
	}
}

function Ball(x, y, fill, outline, type){
	this.x = x;
	this.y = y;
	this.type = type;
	this.fill = fill;
	this.outline = outline;
	this.radius = BALL_RADIUS;
	this.angle = Math.PI;
	this.update = function(){
		console.log("Update");
	},
	this.render = function(){
		ctx = gameArea.context;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 2*Math.PI, false);
		ctx.fillStyle = this.fill;
		ctx.fill();
		ctx.lineWidth = 5;
		ctx.strokeStyle = this.outline;
		ctx.stroke();
	}
}
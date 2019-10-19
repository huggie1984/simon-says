
var stage,
canvas,
max_width,
max_height,
coloursArray = [],
userArray,
computerArray,
sequenceEnd,
count,
round,
st,
button,
board,
title,
ui,
ui2;

	function init(){
	
		canvas = document.getElementById( 'mycanvas' );
		max_width = canvas.width = window.innerWidth;
		max_height = canvas.height = window.innerHeight;			
		stage = new createjs.Stage(canvas);
		stage.enableMouseOver(10); 
		
		var boardX = max_width/4;
		var boardY = max_height/4;
		
		createjs.Ticker.addEventListener("tick", stage);
		createjs.Ticker.setFPS(30); 	
		
		board = new createjs.Shape();
		board.graphics.beginRadialGradientFill(["#111","#D3D3D3"], [0, 1], canvas.width/2, canvas.height/2, 150, canvas.width/2, canvas.height/2, 0).drawCircle(canvas.width/2, canvas.height/2, 400);		
		stage.addChild(board);
	
		var red = createObject('#910909',boardX+5,boardY+5,0,90);
		var green = createObject('#09912d',boardX-5,boardY+5,90,180);
		var yellow = createObject('#8e9109',boardX-5,boardY-5,180,270);
		var blue = createObject('#092d91',boardX+5,boardY-5,270,360);	
		stage.addChild(red, green, yellow, blue);
		coloursArray.push(red, green, yellow, blue);			
		
		for(var i = 0; i < coloursArray.length; i++){
			coloursArray[i].id = i;
			coloursArray[i].cursor = 'pointer';
			coloursArray[i].addEventListener('click', buttonHandler);
		
		}
		
		title = createText('SIMON SAYS','#fff',canvas.width/2,100);	
		title.shadow = new createjs.Shadow("#000000", 5, 5, 10);
		stage.addChild(title);
		
		ui = createText('START','#ADADAD',canvas.width/2,(canvas.height/2)-50);
		ui2 = ui.clone();
		ui2.color = '#111';
		ui2.outline = 4;
		
		button = new createjs.Bitmap("button.png");
		var imgDimension = 150;
		button.x = (canvas.width/2)-219.5;
		button.y = (canvas.height/2)-219.5;
		//button = new createjs.Shape();
		//button.graphics.beginRadialGradientFill(["#111","#4d4d4d"], [0, 1], canvas.width/2, canvas.height/2, 100, canvas.width/2, canvas.height/2, 150).drawCircle(canvas.width/2, canvas.height/2, 150);
		button.addEventListener('click', playHandler);
		stage.addChild(button);
		stage.addChild(ui,ui2);
			
		stage.update();	 
		
		       
	}
	
	
	function playHandler(e){
	    disablemouse();
		start();
		ui.text = '0';
		ui2.text = '0';
	}
		
	function start(){
	
		userArray = [];
		computerArray = [];
		count = 0;
		round = 0;
		sequenceEnd = false;
		newRound();
	}
		
	function newRound(){
	
		var r = Math.floor(Math.random() * coloursArray.length);
		userArray.push(r);
		
		st = setInterval(checkColours, 1000);
		
	}
		
	function checkColours(){
	
		if(count < userArray.length){
			var value = userArray[count];
			
			createjs.Tween.get(coloursArray[value]).to({alpha:0.5}, 300).to({alpha:1},300);
			
			count++;
		
		}else{
			clearInterval(st);
			
			//concat creates a new array consisting of the elements in the this object on which it is called,
			//user array defines the call seq order
			computerArray = userArray.concat();
			
			sequenceEnd = true;
		}
	}
	
	
	function buttonHandler(e){
	
		if(sequenceEnd){
		//computerChoice is taking 1st element from computerArray
			var computerChoice = computerArray.shift();
			var userChoice = e.target.id;
	  
		if(userChoice == computerChoice){
		 //if button pushed id equals computerChoice
			createjs.Tween.get(coloursArray[userChoice]).to({alpha:0.5}, 300).to({alpha:1},300);
			
		
		if(computerArray.length == 0){
			newRound();
			count = 0;
			sequenceEnd = false;		
			round++;
		    ui.text = round;	
		    ui2.text = round;
		}
		
		}else{
			ui.text = 'START';
			ui2.text = 'START';
			enablemouse();
		}	
		}
	}			
	
	function createObject(colour, x, y, start, end){
		var g = new createjs.Graphics();
		g.color = colour;
	    g.beginRadialGradientFill([colour,'#111'], [0, 1], x, y, 200, x, y, 400);
		g.arc(x, y, 350, start * Math.PI/180, end * Math.PI/180, false);
		g.lineTo(x, y);
	    g.outline = 4;
		g.closePath();            
		   		
		var s = new createjs.Shape(g);
		s.x = x;
		s.y = y;
		return s;
	}
	
	function createText(string, colour , x, y){
	var g = new createjs.Text(); 
	g.text = string; 
	g.color = colour; 
	g.font = 'bold 60pt Arial'; 
	g.textAlign = 'center'; 
	g.x = x; 
	g.y = y; 	
	g.shadow;
	g.outline;
	return g;
	}	
	
	function enablemouse(){
	button.mouseEnabled = true;	
	}
	
	function disablemouse(){
	button.mouseEnabled = false;
	}
	
	//style button
	

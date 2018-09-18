var field;
var fsize = 4;

function setup(){
	createCanvas(innerWidth, innerHeight);
	field = []
	for(var i = 0; i < fsize; i++){
		var line = [];
		for(var j = 0; j < fsize; j++){
			line.push(0);
		}
		field.push(line);
	}
	addTwos(field);
	addTwos(field);
}


function draw(){
	background(230);
	fill(120);
	noStroke();
	rectMode(CENTER);
	translate(width/2, height/2);
	rect(0, 0, 800, 800);
	drawField();
}

function drawField(){
	for(var row = 0; row < field.length; row++){
		for(var col = 0; col < field[row].length; col++){
			var dist = 180;
			
			var xoff = (col - (fsize-1)/2) * dist;
			var yoff = (row - (fsize-1)/2) * dist;
			//translate(xoff, yoff);
			fill(255, 255, log(field[row][col], 2) * 32);
			rect(xoff, yoff, 150, 150);
			fill(0);
			textSize(52);
			text('' + field[row][col], xoff, yoff);
		}
	}	
}

function isWon(){
	for(var r = 0; r < fsize; r++){
		for(var c = 0; c < fsize; c++){
			if(field[r][c] == 2048){
				return true;
			}
		}
	}
	return false;
}

function touchStarted(){
	touchStartX = mouseX;
	touchStartY = mouseY;
	swiping = true;
}

function touchEnded(){
	var xdist = mouseX - touchStartX;
	var ydist = mouseY - touchStartY;
	if(abs(xdist) > abs(ydist)){
		if(xdist > 0){
			field = shiftHorizontally(field, false);
		} else if(xdist < 0){
			field = shiftHorizontally(field, true);
		}
	} else if(abs(ydist) > abs(xdist)){
		if(ydist > 0){
			field = shiftVertically(field, true);
		} else if(ydist < 0){
			field = shiftVertically(field, false);
		}
	}
	swiping = false;
}

function keyPressed(){
	//var moved = false;
	if(keyCode === RIGHT_ARROW){
		field = shiftHorizontally(field, false);
	}
	if(keyCode === LEFT_ARROW){
		field = shiftHorizontally(field, true);
	}
	if(keyCode === UP_ARROW){
		field = shiftVertically(field, false);
	}
	if(keyCode === DOWN_ARROW){
		field = shiftVertically(field, true);
	}
}

function rotateField(original, reverse){
	retField = [];
	for(var x = 0; x < fsize; x++){
		retField[x] = [];
		for(y = 0; y < fsize; y++){
			retField[x][y] = original[y][x]
		}
		if(!reverse){
			retField[x].reverse();
		}
	}
	if(reverse){
		retField.reverse();
	}
	return retField;
}

function shiftVertically(original, reverse){
	var newField = rotateField(original, false);
	newField = shiftHorizontally(newField, reverse);
	return rotateField(newField, true);
}

function shiftHorizontally(original, reverse){
	var newField = [];
	for(var row = 0; row < fsize; row++){
		var newRow = original[row].filter(function(value, index, array) {
			return value;
		});
		if(reverse){
			newRow.reverse();
		}
		var nonNull = newRow.length;
		for(var col = newRow.length - 1; col >= 0; col--){
			var next = newRow[col - 1] ? newRow[col - 1] : 0;
			if(next === newRow[col]){
				newRow.splice(col, 1);
				newRow[col - 1] *= 2;
				col--;
			}
		}
		while(newRow.length < fsize){
			newRow.unshift(0);
		}
		if(reverse){
			newRow.reverse();
		}
		newField.push(newRow);
	}
	for(var row = 0; row < fsize; row++){
		for(var col = 0; col < fsize; col++){
			if(original[row][col] !== newField[row][col]){
				var moved = true;
			}
		}
	}
	if(moved){
		addTwos(newField);
	}
	return newField;
}

function addTwos(newField){
	var empty = [];
	for(var r = 0; r < fsize; r++){
		for(var c = 0; c < fsize; c++){
			if(newField[r][c] === 0){
				var p = {};
				p.r = r;
				p.c = c;
				empty.push(p);
			}
		}
	}
	var p1 = random(empty);
	newField[p1.r][p1.c] = floor(random(1, 3)) * 2;
	
}
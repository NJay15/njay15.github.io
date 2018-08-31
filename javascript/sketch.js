var font;
var vehicles = [];
var points = [];
var txt;

function preload() {
  font = loadFont('AvenirNextLTPro-Demi.otf');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  background(51);
  txt = 'NJ';
  var params = getURLParams();
  if(params.text){
	  txt = params.text;
  }
  updateText();
}

function draw() {
  background(51);
  
  fill(255);
  stroke(0);
  //var bounds = font.textBounds(txt, 192);
  //rect(100, 200, 80, textWidth());
  
  for (var i = 0; i < vehicles.length; i++) {
	var v = vehicles[i];
	v.behaviors();
    v.update();
    v.show();
    if(i + 1 < vehicles.length){
	  var d = dist(v.pos.x, v.pos.y, vehicles[i+1].pos.x, vehicles[i+1].pos.y);
	  if(d < 40){
		var alpha = map(d, 40, 20, 0, 255)
		var col = color(255, 255, 255, alpha);
	    strokeWeight(4);
	    stroke(col);
	    line(v.pos.x, v.pos.y, vehicles[i+1].pos.x, vehicles[i+1].pos.y);
	  }
	}
    
	
  }
}

function keyTyped() {
  if (keyCode === BACKSPACE) {
    txt = txt.substring(0, txt.length - 1);
    updateText();
  } else {
	txt += key.toUpperCase();
    updateText();
  }
}

function updateText(){
  textAlign(CENTER);
  textFont(font);
  var margin = 500;
  var tsize = 192;
  do{
    textSize(tsize);
    var w = textWidth(txt);
    points = font.textToPoints(txt, width/2 - w/2, 500, tsize, {
      sampleFactor: 0.1
    });
	tsize--;
  } while(w > width - margin * 2);
  //shuffle(points, true);
  if (vehicles.length < points.length) {
	for (var i = vehicles.length; i < points.length; i++) {
	  var vehicle = new Vehicle(0, 0);
      vehicles.push(vehicle);
	}
  } else if (vehicles.length > points.length) {
	for (var i = vehicles.length; i > points.length; i--) {
	  vehicles.pop();
	}		
  }
  for(var i = 0; i < vehicles.length; i++){
    vehicles[i].setTarget(points[i].x, points[i].y);
  }
}
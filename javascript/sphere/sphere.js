var r = 0;
var rotZ = 0;

var res = 20;

var amp;

var hist;

function preload(){
  //sound = loadSound('assets/nekhma.mp3');
}


function setup(){
  //sound.play();
  var params = getParams();
  if(params.res){
    res = params.res;
  }
  createCanvas(innerWidth, innerHeight, WEBGL);
  translate(width/2, height/2);
  audio = new p5.AudioIn();
  audio.connect();
  //amp = new p5.Amplitude();
  //amp.smooth(1);
  hist = [];
}

function draw(){
  //rotateX(HALF_PI);
  var lvl = audio.getLevel();//amp.getLevel();
  hist.push(lvl);
  if(hist.length > res){
	  hist.splice(0, 1);
  }
  //rotateZ(HALF_PI);
  rotateY(PI + sin(rotZ += 0.005));
  background(0);
  
  noFill();
  strokeWeight(2 + 6 * lvl);
  for(var lon = 0; lon < res; lon++){ 
      colorMode(HSB, 255);
	    var col = color(map(lon, res, 0, 0, 300), 200, 200);
        stroke(col);
		fill(col);
	  colorMode(RGB, 255);
	  beginShape();
	  var lonang = map(lon, 0, res, 0, PI);
	  r = map(hist[lon], 0, 1, 200, 300);
	  for(var lat = 0; lat < res; lat++){
		  var latang = map(lat, 0, res, 0, TWO_PI);
		  
		  var x = r * sin(lonang) * cos(latang);
		  var y = r * sin(lonang) * sin(latang);
		  var z = r * cos(lonang);
		  vertex(x, y, z);
		  
	  }
      endShape(CLOSE);
  }
}

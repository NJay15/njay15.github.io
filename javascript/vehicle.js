function Vehicle(x, y) {
  this.pos = createVector(random(width), random(height));
  if(params.outBounds === 'true'){
    var wr = random([-1, 1]);
    var hr = random([-1, 1]);
    this.pos.add(createVector(width * wr, height * hr));
  }
  this.target = createVector(x, y);
  this.vel = p5.Vector.random2D();
  this.acc = createVector();
  this.r = 8;
  this.maxspeed = 10;
  this.maxforce = 1;
  this.speed = 0;
}

Vehicle.prototype.setTarget = function(x, y) {
  this.target = createVector(x, y);
}

Vehicle.prototype.behaviors = function() {
  if (keyIsDown(DOWN_ARROW)) {
    this.setTarget(this.pos.x, height);
  }
  var arrive = this.arrive(this.target);
  var mouse = createVector(mouseX, mouseY);
  var flee = this.flee(mouse);
  arrive.mult(0.5);
  flee.mult(5);

  this.applyForce(arrive);
  this.applyForce(flee);
}

Vehicle.prototype.applyForce = function(f) {
  this.acc.add(f);
}

Vehicle.prototype.update = function() {
  this.pos.add(this.vel);
  this.vel.add(this.acc);
  this.acc.mult(0);
}

Vehicle.prototype.show = function() {
  //stroke(255);
  var fac = map(this.speed, 0, 10, 0, 1);
  colorMode(HSB, 360, 100, 100, 1)
  var col = color(261,  50 + (100 * (1 - fac))/2, 100 * fac);
  stroke(col);
  colorMode(RGB, 255);
  //var fac = abs(cos(this.speed * 0.2));
  strokeWeight(this.r * fac);
  point(this.pos.x, this.pos.y);
}


Vehicle.prototype.arrive = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  this.speed = this.maxspeed;
  if (d < 100) {
    this.speed = map(d, 0, 100, 0, this.maxspeed);
  }
  desired.setMag(this.speed);
  var steer = p5.Vector.sub(desired, this.vel);
  steer.limit(this.maxforce);
  return steer;
}

Vehicle.prototype.flee = function(target) {
  var desired = p5.Vector.sub(target, this.pos);
  var d = desired.mag();
  var fleeRad = 50;
  if(mouseIsPressed){
	fleeRad = random(2000);
	this.maxspeed = 20;
  } else {
	this.maxspeed = 10;
  }
  if (d < fleeRad) {
    desired.setMag(this.maxspeed);
    desired.mult(-1);
    var steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0, 0);
  }
}

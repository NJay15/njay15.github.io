 let pg ;
 let exp ;
 let a ;
 let w ;
 let texRes = 8 ;
 let outline = true ;
 function setup ( ) { 
	exp= createGraphics( 64 , 64 ) ;
	w= exp . width/ 2 ; 
	pg= createGraphics( w, w) ;
	input = createFileInput(handleFile);
	input.position(width/2, height/2);
	colorPicker = createColorPicker('#000000');
	colorPicker.position(width/2, height/2 + 50);
}

function draw() {}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
	let inputImg = loadImage(file.data, () => {
		a= inputImg . height/ 2 ;
		print("h: " + inputImg . height)
		print( "w: " + inputImg . width)
		convert(inputImg);
	},
	() => {print("Image could not be loaded!");}
	)
  } else {}
}
 
function convert (img) { 
 exp . background( 0 , 0 , 0 , 0 ) ;
 drawRotated( 0, img ) ;
  exp . push( ) ;
 exp . translate( texRes/ 2 + texRes, texRes/ 2) ;
 exp . rotate( radians( 90 ) ) ;
 exp . translate( - texRes/ 2 , - texRes/ 2 ) ;
 exp . image( pg, 0 , 0 , texRes, texRes) ;
 exp . pop( ) ;

 drawRotated( 120, img ) ;
 exp . push( ) ;
 exp . translate( texRes/ 2, texRes/ 2 + texRes) ;
 exp . rotate( radians(- 90 ) ) ;
 exp . translate( - texRes/ 2 , - texRes/ 2 ) ;
 exp . image( pg, 0 , 0 , texRes, texRes) ;
 exp . pop( ) ;
 
 drawRotated( - 120, img ) ;
 exp . push( ) ;
 exp . translate( texRes/ 2 + texRes , texRes/ 2 + texRes) ;
 exp . rotate(radians( 180 ) ) ;
 exp . translate( - texRes/ 2 , - texRes/ 2 ) ;
 exp . image( pg, 0 , 0 , texRes, texRes) ;
 exp . pop( ) ;
 
 if ( outline) {
	 exp.strokeWeight(1);
	 exp.strokeCap(PROJECT);
	 exp . stroke( colorPicker.color()) ;
	 exp . line( 40.5 , 0.5 , 47.5 , 0.5 ) ;
	 exp . line( 47.5 , 0.5 , 47.5 , 15.5 ) ;
	 exp . line( 32.5 , 15.5 , 47.5 , 15.5 ) ;
	 exp . line( 32.5 , 8.5 , 32.5 , 15.5 ) ;
}
 exp . save( "skin.png" ) ;
}
function drawRotated ( degrees, img ) { 
pg . background( 0x00000000 ) ;
pg . rotate( radians( - 45 ) ) ; 
pg . scale( ( sqrt( 2 / 3.0) * w) / a, ( sqrt( 2 ) * w) / a) ; 
pg . translate( 0 , a) ; 
pg . rotate( radians( degrees) ) ;
print(a);
 pg . scale( sqrt( 3 ) * a/ img . width, 1 ) ;
 pg . translate( -img.width/2 , -a) ;
 pg . image( img, 0 , 0 ) ;
 pg.resetMatrix();
} 
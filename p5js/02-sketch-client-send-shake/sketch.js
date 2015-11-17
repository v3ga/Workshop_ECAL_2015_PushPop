// --------------------------------------------
var URL_SERVER = "ws://MacBook-Pro-de-Julien.local:12345/p5websocket";

// --------------------------------------------
function setup()
{
  	createCanvas(500, 500);

	var myShakeEvent = new Shake({
    	threshold: 15, // optional shake strength threshold
    	timeout: 1000 // optional, determines the frequency of event generation
	});
	
	console.log(myShakeEvent.hasDeviceMotion);

	myShakeEvent.start();
	window.addEventListener('shake', shakeEventDidOccur, false);
	
	connect(URL_SERVER);
}

// --------------------------------------------
function draw()
{
}

// --------------------------------------------
function shakeEventDidOccur()
{
	console.log("shake!");

	var data ={ event : "shake"};
	send(data);
}



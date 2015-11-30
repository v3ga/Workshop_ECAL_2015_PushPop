// --------------------------------------------
var URL_SERVER = "ws://10.192.234.111:12345/p5websocket";
//10.192.250.59
var anythingplaying = false;
var incre_plr_id = 100000;
var msg;
var fk = "";
var scplayer;
var scplayers =[];
var sctrack;
var firstcall = true;
var waveformjsdata;
var g_wve;
var g_moveup;
var sqr_diagonal;
var wve_thickness = 400;
var final_wve_draw = [];

var wve_angle = 20;
var particle_array = [];
var unstable_particle_array = [];
var particle_height = 30;
///COOLLLOOOOOORRRRRSSSSSS
var background_color = [229,231,222];
var wave1_bg_color = hexToRgb("0098d8");
var wave1_stroke_color = hexToRgb("0b3536");
var wave2_bg_color = hexToRgb("f54123");
var wave2_stroke_color = [12,12,233];
var particle_color = [12,12,233];
var textcolor = hexToRgb("0b3536");

var dooropenforparticles = true;
//int num=30, movers=20, d3=35, frames=120;
// --------------------------------------------
function preload(){
  img = loadImage("sc_logo.png");
  img2 = loadImage("sc_logo2.png");
  fontBold = loadFont("abduction2002.ttf");
}
function setup()
{
  createCanvas(windowWidth, windowHeight);
  sqr_diagonal = round(Math.sqrt((windowHeight*windowHeight)*2));
  console.log(sqr_diagonal);
  //g_wve = createGraphics(sqr_diagonal, 400);
  g_wve = createGraphics(windowHeight, 400);
  g_moveup = createGraphics(500,windowHeight);
	connect(URL_SERVER);
  frameRate(60);
  //  blendMode(DODGE);
  //blendMode(DIFFERENCE);

}

function cstm_setup(){
  waveformjsdata = window.waveformjsdata;
  //saveJSON(window.waveformjsdata);
  sctrack = window.sctrack;

  console.log(sctrack.id);
  console.log(sctrack.title);
  console.log(sctrack.duration);
  firstcall = false;
  shortenwvedata(20);

}

// --------------------------------------------
function draw()
{
//do stuff when my external shizzle is loaded
if(window.scok == true && firstcall == true){cstm_setup();}

if(firstcall == false){

  background(background_color);


  push();  // Start a new drawing state
  translate(windowWidth/3*2+150,70);
  angleMode(DEGREES);
  rotate(10);

  textFont(fontBold);
  noStroke();
  textSize(53);
  fill(textcolor);
  text(sctrack.user.username, 30, 70);
  textSize(53);
  text(sctrack.title, 30, 150,200,800);
  pop();
  push();
  angleMode(DEGREES);
  rotate(10);
  textFont(fontBold);
  noStroke();
  textSize(53);
  fill(textcolor);
  text("PLAYING AT: ", 70, 70);
  pop();

  push();
  translate(windowWidth-100,windowHeight-70);

  if(textcolor[2] == hexToRgb("f54123")[2]){
    image(img, 0, 0);
  }else{
    image(img2, 0, 0);
  }
  pop();


  for (var y=0; y<unstable_particle_array.length; y++) {

    unstable_particle_array[y].display();
    unstable_particle_array[y].move();

    if(unstable_particle_array[y].x>unstable_particle_array[y].lifetime)
    {
      unstable_particle_array[y].diameter = unstable_particle_array[y].diameter -1;
    }
    if(unstable_particle_array[y].diameter < 0){
      unstable_particle_array.splice(0, 1);
    }
  }

  for (var y=0; y<particle_array.length; y++) {



    particle_array[y].move();
    particle_array[y].display();

    if(particle_array[y].x>windowWidth)
    {
      particle_array[y].player.pause();
      particle_array.splice(0, 1);
    }
    //PLAYYYYERRERERERERERERRE

    if(particle_array[y] && particle_array[y].player && particle_array[y].player.isBuffering() != true && particle_array[y].x > 300){


      noStroke();
      textSize(53);
      textFont(fontBold);
      fill(textcolor);
      if(round(particle_array[y].player.currentTime()/1000) >2 && particle_array[y].player && particle_array[y].player.isPlaying() == true ){
          var seccsss = round(particle_array[y].player.currentTime()/1000)%60;
          var minnnss = floor(round(particle_array[y].player.currentTime()/1000)/60);
          text(minnnss+":"+nf(seccsss,2,0), 30, particle_array[y].y);
      }



      //console.log(particle_array[y].player.isBuffering());
      if(particle_array[y].playing == true && particle_array[y].played == false){

            console.log("PLAAYYYYYINGGG");
            particle_array[y].player.play();
            particle_array[y].player.seek(particle_array[y].seek);

            particle_array[y].played = true;

        }
        var millistoplay = 4500;


        //console.log(y+" == "+particle_array[y].seek+millistoplay+" < "+round(particle_array[y].player.currentTime()));
        if(particle_array[y].seek+millistoplay < particle_array[y].player.currentTime() && particle_array[y].player.currentTime() != 0){
          console.log("PAAAUUUSSSEEEDD");
          particle_array[y].player.pause();
          //console.log(scplayers[y].currentTime()+" staaaaaaaap "+y);

        }
        if(particle_array[y].playing == false && particle_array[y].played == true){
          console.log("uhgsdfhgklshdfkh");
          //particle_array[y].player.pause();
          //console.log(scplayers[y].currentTime()+" staaaaaaaap "+y);

        }

    }
    var hasmarked = false;
    for (var u=0; u<final_wve_draw.length; u++) {
      if(final_wve_draw[u].mark == true){
        hasmarked = true;
      }
    }
    if(hasmarked == false){
      console.log("NONONONOOO");
      anythingplaying = false;
      //textcolor = hexToRgb("0b3536");
    }else{
      console.log("iiiiiiiiiii");
      anythingplaying = true;
      if(frameCount%10 == 0){
        if(textcolor[2] == hexToRgb("f54123")[2]){
          textcolor = hexToRgb("0b3536");
        }else{
          textcolor = hexToRgb("f54123");
        }
      }
    }







  }
  if(particle_array.length > 1){
    //console.log(particle_array[1].x+" "+particle_array[1].y);
  }




  if(typeof scplayer !== 'undefined'){
    console.log(scplayer.currentTime());

  }
  //imageMode(CENTER);
  //fill(22,144,54);
  //rect(100,500,1000,particle_height);


  //g_wve.background(255);

 final_wve_draw = [];
  for (i=0; i<waveformjsdata.length; ++i) {
    fill(23,34,231);

    v_x = map(i,0,waveformjsdata.length-1,0,windowHeight)+600;
    mid_y = 150;
    v_y = map(waveformjsdata[i],1,0,0,mid_y)+windowHeight-map(waveformjsdata[0],1,0,0,mid_y);
    v_y2 = map(waveformjsdata[i],0,1,mid_y,300)+windowHeight-map(waveformjsdata[0],1,0,0,mid_y);

    //g_wve.vertex(v_x, mid_y);
    var nupoints = rotate_point(v_x, v_y,600,windowHeight,-80);
    var nupoints2 = rotate_point(v_x, v_y2,600,windowHeight,-80);

    var nupoints_is = false;
    var nupoints2_is = false;
    for (var o=0; o<particle_array.length; o++) {
      if((particle_array[o].x > nupoints.x && particle_array[o].x < nupoints2.x)
      &&(particle_array[o].y > nupoints.y && particle_array[o].y < nupoints.y+40)){
        nupoints_is = true;
        particle_array[o].playing=true;
      }else{
        //particle_array[o].playing=false;
      }
      if((particle_array[o].x > nupoints.x && particle_array[o].x < nupoints2.x)
      &&(particle_array[o].y > nupoints2.y && particle_array[o].y < nupoints2.y+40)){
        nupoints2_is = true;
        particle_array[o].playing=true;
      }else {

      }
    }
    if (nupoints_is == true) {
      final_wve_draw.push({x:nupoints.x,y:nupoints.y,mark:true});
    }else{
      final_wve_draw.push({x:nupoints.x,y:nupoints.y,mark:false});
    }
    if (nupoints2_is == true) {
      final_wve_draw.push({x:nupoints2.x,y:nupoints2.y,mark:true});
    }else{
      final_wve_draw.push({x:nupoints2.x,y:nupoints2.y,mark:false});
    }
  }
  //final_wve_draw.sortOn("mark");
  stroke(wave1_stroke_color);
  strokeWeight(3);
  beginShape();
  isnormal = true;
  fill(wave1_bg_color);
  for (var u=0; u<final_wve_draw.length; u++) {
    if(final_wve_draw[u].mark == true){
      if(isnormal == true){
        fill(wave1_bg_color);
        isnormal = false;
      }
    }else{
      if(isnormal == false){
        fill(wave2_bg_color);
        isnormal = true;
      }
    }
    //console.log(final_wve_draw[u].x+" "+final_wve_draw[u].y+" "+final_wve_draw[u].mark);
    vertex(final_wve_draw[u].x,final_wve_draw[u].y);
    //vertex(nupoints2.x, nupoints2.y);
  }
  endShape();


}


}

// --------------------------------------------

//sfunction fk_

function createSCplayer(id){
  var fishstick;
  SC.stream("/tracks/"+sctrack.id, {autoLoad: true}).then(function(player){
    player.options.debug = false;
    player.options.useSinglePlayer = false;
    player.options.soundId = id;
    fishstick = player;
  });
  return fishstick;
}

function shortenwvedata(cccc) {
  var waveformjsdatatemp = waveformjsdata;
  waveformjsdata = [];
  for (i=0; i<waveformjsdatatemp.length; i=i+cccc) {
    waveformjsdata[i/cccc] = waveformjsdatatemp[i]
  }
  console.log("newlenght "+waveformjsdata.length);
}

function particle(yyy,unstable2) {
  this.x = 0;
  this.y = yyy;
  this.diameter = particle_height;
  this.speed = 1;
  this.todraw = [];
  this.playing = false;
  this.played = false;
  this.seek = round(map(this.y,windowHeight,0,0,sctrack.duration));
  this.seeked = false;
  this.paused = false;
  this.unstable = unstable2;
  this.lifetime = round(random(100,300));

  this.player; //= new createSCplayer(random(111111,999999));

  this.move = function() {
    this.x += this.speed; //random(-this.speed, this.speed);
    this.y = this.y;
  };

  this.display = function() {
    strokeWeight(3);
    stroke(wave1_stroke_color);
    fill(0,0,0,0);
    ellipse(this.x, this.y, this.diameter, this.diameter);

  };
}

Math.radians = function(degrees) {
  return degrees * Math.PI / 180;
};

// Converts from radians to degrees.
Math.degrees = function(radians) {
  return radians * 180 / Math.PI;
};
function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
    ] : null;
}
Array.prototype.sortOn = function(key){
    this.sort(function(a, b){
        if(a[key] < b[key]){
            return -1;
        }else if(a[key] > b[key]){
            return 1;
        }
        return 0;
    });
}
function rotate_point(pointX, pointY, originX, originY, angle) {
    angle = angle * Math.PI / 180.0;
    return {
        x: Math.cos(angle) * (pointX-originX) - Math.sin(angle) * (pointY-originY) + originX,
        y: Math.sin(angle) * (pointX-originX) + Math.cos(angle) * (pointY-originY) + originY
    };
}
function onMessage(data)
{
	// do something with data received
  msg = data;
  console.log(msg);

  var nunuyyy = max(min(msg.y,1),0);
  nunuyyy = map(nunuyyy,0,1,0,windowHeight);
  console.log(nunuyyy);
  addparticle(nunuyyy);

}
function sender(xxx,yyy) {
xxx=round(xxx);
yyy=round(yyy);
  var data =
  {
    x: xxx,
    y: yyy
  };

  //send(data);
  send("10.192.234.111",data);
}
function addparticle(nunuyyy) {
  if(dooropenforparticles && particle_array.length < 5){
    particle_array.push(new particle(nunuyyy,false));

    dooropenforparticles = false;
    SC.stream("/tracks/"+sctrack.id, {autoLoad: true}).then(function(player){
      player.options.debug = false;
      player.options.useSinglePlayer = false;
      player.options.soundId = incre_plr_id;
      incre_plr_id++;
      particle_array[particle_array.length-1].player = player;

      particle_array[particle_array.length-1].player.play();
      particle_array[particle_array.length-1].player.setVolume(0);
      setTimeout(function(){
        particle_array[particle_array.length-1].player.pause();
        particle_array[particle_array.length-1].player.setVolume(1);
        dooropenforparticles = true;
      },500);
      console.log("playr "+id+" loaded");
    });
  }else{
    //cons
    unstable_particle_array.push(new particle(nunuyyy,true));
  }

}
function mouseClicked() {
  addparticle(mouseY);
}

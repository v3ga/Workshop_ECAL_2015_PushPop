// ------------------------------------------------------
import org.webbitserver.*;

// ------------------------------------------------------
WebSocketServerP5 socket;

// ------------------------------------------------------
void setup() 
{
  size( 800, 600 );
  socket = new WebSocketServerP5( this, 12345 );
}

// ------------------------------------------------------
void draw() 
{
  background(255);
}

// ------------------------------------------------------
void mousePressed()
{
}

// ------------------------------------------------------
void keyPressed()
{
}

// ------------------------------------------------------
void stop() 
{
  socket.stop();
}


// ------------------------------------------------------
void websocketOnMessage(WebSocketConnection con, String msg) 
{
  // println("data from : "+ socket.getIP(con) );
  //println(msg);
  socket.broadcast(msg);
}

// ------------------------------------------------------
void websocketOnOpen(WebSocketConnection con) 
{
  println("A client joined : "+ socket.getIP(con) );
}

// ------------------------------------------------------
void websocketOnClosed(WebSocketConnection con) 
{
   // println("A client left");
}


// ------------------------------------------------------
import org.webbitserver.*;

// ------------------------------------------------------
WebSocketP5 socket;

// ------------------------------------------------------
void setup() 
{
  size( 800, 600 );
  socket = new WebSocketP5( this, 12345 );
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
  println("data from : "+ socket.getIP(con) );
}

// ------------------------------------------------------
void websocketOnOpen(WebSocketConnection con) 
{
  println("A client joined : "+ socket.getIP(con) );

}

// ------------------------------------------------------
void websocketOnClosed(WebSocketConnection con) 
{
   println("A client left");
}


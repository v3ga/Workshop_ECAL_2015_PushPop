var websocket;

function connect(server)
{
	websocket = new WebSocket(server);
	
	websocket.onmessage = function(e)
	{
		if (typeof onMessage == 'function')
		{
		  	onMessage( JSON.parse(e.data).data );
		}
	}

	websocket.onerror = function(e)
	{
		console.log("pushpop.js - "+e);
	}
}

function send()
{
	if (websocket)
	{
		if (arguments.length >=1 || arguments.length <= 3)
		{
			var command;
			if (arguments.length == 1)
				command = {data : arguments[0]};
			if (arguments.length == 2)
				command = {ip : ip, data : arguments[1]};
			else if (arguments.length == 3)
				command = {ip : ip, func : arguments[1], data : arguments[2]};
		
			websocket.send( JSON.stringify( command ) );
		}
		else
			console("pushpop.js - send() - invalid number of arguments");
	}
	else
	{
		console.log("pushpop.js - send() - call connect() first");
	}
}

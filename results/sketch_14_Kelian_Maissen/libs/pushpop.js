// ------------------------------------------------------
var websocket;

// ------------------------------------------------------
var websocket_debug = true;

// ------------------------------------------------------
function connect(server)
{
	websocket = new WebSocket(server);

	websocket.onmessage = function(e)
	{
		if (typeof onMessage == 'function')
		{
			if (websocket_debug)
				console.log(e.data);
		  	onMessage( eval(JSON.parse(e.data).data) );
		}
	}

	websocket.onerror = function(e)
	{
		console.log("pushpop.js - erreur : "+e);
	}
}

// ------------------------------------------------------
function send()
{
	if (websocket)
	{
		if (arguments.length ==1 || arguments.length == 2)
		{
			var dataEmbed;
			if (arguments.length == 1)		dataEmbed = {data : arguments[0]};
			if (arguments.length == 2)		dataEmbed = {ip : arguments[0], data : arguments[1]};

			var dataEmbedJSON = JSON.stringify( dataEmbed );

			websocket.send( dataEmbedJSON );

			if (websocket_debug)
				console.log( dataEmbedJSON );
		}
		else
			console.log("pushpop.js - send() - le nombre d'arguments n'est pas valide (1 ou 2)");
	}
	else
	{
		console.log("pushpop.js - send() - appeler la fonction connect() d'abord");
	}
}

// ------------------------------------------------------
function sendIP()
{
	if (websocket)
	{
		if (arguments.length == 2)
		{
			var dataEmbed = {ip : arguments[0], data : arguments[1]};
			var dataEmbedJSON = JSON.stringify( dataEmbed );
			websocket.send( dataEmbedJSON );

			if (websocket_debug)
				console.log( dataEmbedJSON );
		}
		else
			console("pushpop.js - send() - le nombre d'arguments n'est pas valide (2)");
	}
	else
	{
		console.log("pushpop.js - send() - appeler la fonction connect() d'abord");
	}
}

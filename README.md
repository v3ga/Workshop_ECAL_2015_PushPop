# Push Pop

# Interface de programmation
## Processing
```processing
// Se connecter au serveur
void connect(String uri);
// Envoyer des données au format JSON à tous les sketchs connectés au serveur
void send(JSONObject data);
// Envoyer des données au format JSON à un sketch d'une machine identifiée par une IP
void sendIP(String ip, JSONObject data);
```
### exemples
* Envoi de données au serveur
* Envoi de données à une machine

## p5.js
```p5.js
// Se connecter au serveur
connect(uri);
// Envoyer des données au format JSON à tous les sketchs connectés au serveur
send(data);
// Envoyer des données au format JSON à un sketch d'une machine identifiée par une IP
sendIP(ip,data);
```


## Liens
### Processing
* wsp5 — https://github.com/labatrockwell/wsp5
* WebsocketP5 — https://github.com/muthesius/WebSocketp5 (basée sur http://webbitserver.org/)

### Javascript
* Shake.js — https://github.com/alexgibson/shake.js/
* Gyrojs — http://tomg.co/gyrojs

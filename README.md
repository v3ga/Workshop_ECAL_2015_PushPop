# Push Pop
Travailler, forger, transformer, traiter, communiquer des données entre participants pour produire fabriquer une installation visuelle et sonore sur le principe du cadavre exquis.

Le premier groupe choisit le format de l’entrée, transforme les données et les transmet au deuxième groupe.
Un groupe dans la chaîne reçoit des données du groupe précédent, les transforme et les transmet au groupe suivant.
Le dernier groupe reçoit les données de l’avant dernier groupe, les transforme et choisit un format de sortie.

Le traitement des données ne doit pas être instantané, un délai entre la réception et l’émission doit être introduit.


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
Quelques librairies à exploiter : 

* **Mobile**
  * Shake.js — https://github.com/alexgibson/shake.js/
  * Gyrojs — http://tomg.co/gyrojs
  * p5.speech — http://abilitylab.nyu.edu/p5.js-speech/

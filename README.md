# Push Pop
*Atelier de création par le code à l'ECAL du 16 au 20 Novembre 2015*

Travailler, forger, transformer, traiter, communiquer des données entre machines programmables pour fabriquer une installation visuelle et sonore sur le principe du cadavre exquis.

![alt André Breton](http://masmoulin.blog.lemonde.fr/files/2012/02/Cadavre-exquis_Andr%C3%A9-Breton-Goemans-Camille-Jacques-Pr%C3%A9vert-Yves-Tanguy.png)


* https://fr.wikipedia.org/wiki/Cadavre_exquis_(jeu)#Arts_graphiques
* Input/Output de Terry Timely & Park Pictures — https://vimeo.com/141567420
* Translations de Pauline Gourlet — http://www.ensad.fr/projets/translations
* Émissions « Tac au tac » dans les années 70 — https://www.youtube.com/watch?v=hIVbL-Vv0is


### Scénographie 


Le traitement des données ne doit pas être instantané, un délai entre la réception et l’émission doit être introduit.


### Interface de programmation
Les sketches communiqueront entre eux par le biais d'envoi de données à un serveur dont le rôle sera d'écouter les messages entrants et de les redistribuer. Un «client» est un sketch qui se connecte au serveur pour communiquer des données à d'autres clients. Le format d'échange de données est le JSON.

Le **serveur** a été développé avec une version modifiée de WebsocketP5 ( https://github.com/muthesius/WebSocketp5 )
L'interface **client** a été développée avec Processing (*version 2.1.1*) et p5.js (*version 0.4.19*). Pour utiliser la version client dans Processing, il sera nécessaire d'installer la librairie **wsp5** (https://github.com/labatrockwell/wsp5). 


#### Processing
```processing
// Se connecter au serveur
void connect(String uri);
// Envoyer des données au format JSON à tous les sketchs connectés au serveur
void send(JSONObject data);
// Envoyer des données au format JSON à un sketch d'une machine identifiée par une IP
void sendIP(String ip, JSONObject data);
```


#### p5.js
```javascript
// Se connecter au serveur
function connect(uri){...}
// Envoyer des données à tous les sketchs connectés au serveur
// data est un objet javascript encodé en JSON par la librairie
function send(data){...}
// Envoyer des données au format JSON à un sketch d'une machine identifiée par une IP
// data est un objet javascript encodé en JSON par la librairie
function sendIP(ip,data){...}
```


### Liens
#### Websockets
* https://fr.wikipedia.org/wiki/WebSocket

#### Processing
* wsp5 — https://github.com/labatrockwell/wsp5
* WebsocketP5 — https://github.com/muthesius/WebSocketp5 (basée sur http://webbitserver.org/)

#### Javascript
Quelques librairies à exploiter : 

* **Mobile**
  * Shake.js — https://github.com/alexgibson/shake.js/
  * Gyrojs — http://tomg.co/gyrojs
  * p5.speech — http://abilitylab.nyu.edu/p5.js-speech/

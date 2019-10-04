# Push Pop
*Atelier de création par le code à l'ECAL du 16 au 20 Novembre 2015 avec les étudiants de première année en Media & Interaction design ( http://ecal.ch/fr/1103/formations/bachelor/media-interaction-design/projets-workshops )*



**Assistant** // Tibor Udvari — https://twitter.com/tiborudvari

**Organisation** // Cyril Diagne — http://cyrildiagne.com

**Étudiants** // Pierre Allain-Longeval, André Andrade, Giulio Barresi, Mathilde Colson, Pierry Jacquillard — https://twitter.com/pjaquillard, Adrien Kaeser, Luca Kasper, Kelian Maissen, David Nguyen, Mathieu Palauqui, Justine Rieder, Callum Ross, Guillaume Simmen, Fabiola Soavelo, Corentin Vignet 

### Thème 

Travailler, forger, transformer, traiter, triturer, communiquer des données entre machines programmables pour fabriquer une installation visuelle et sonore sur le principe du cadavre exquis.

![alt André Breton](images/andre_breton_cadravre_exquis.png)

* https://fr.wikipedia.org/wiki/Cadavre_exquis_(jeu)#Arts_graphiques
* Input/Output de Terry Timely & Park Pictures — https://vimeo.com/141567420
* Translations de Pauline Gourlet — http://paulinegourlet.com/translations.php
* Émissions « Tac au tac » dans les années 70 — https://www.youtube.com/watch?v=hIVbL-Vv0is
* Mécaniques discursives — http://www.mecaniques-discursives.com/


### Scénographie 
Imaginer une installation avec des écrans (ordinateurs, téléphones portables, tablettes) qui mettent en application cette idée de cadavre exquis. Les règles pourraient être les suivantes :
* chaque participant doit recevoir des données d'un participant «précédent».
* chaque participant doit traiter visuellement les données reçues et transmettre des données au participant «suivant».
* le premier participant de la chaîne est libre du choix des modalités des données entrantes.
* le dernier participant de la chaîne est libre du choix du format de données sortantes.

Le traitement des données ne sera pas instantané, un délai entre la réception et l’émission sera introduit et pourra être influencé / perturbé par des interactions externes.


### Programmation
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
* Matter.js — http://brm.io/matter-js/ — librairie simulation physique en 2D

* **Mobile**
  * Shake.js — https://github.com/alexgibson/shake.js/ — détection évènement «shake»
  * Gyrojs — http://tomg.co/gyrojs 
  * p5.speech — http://abilitylab.nyu.edu/p5.js-speech/

### Photos
![Setup](http://v3ga.github.io/Images/Workshop_ECAL_2015_PushPop/Setup_installation_finale_cadavre_exquis.JPG)
![Debug](http://v3ga.github.io/Images/Workshop_ECAL_2015_PushPop/Setup_installation_finale_cadavre_exquis_debug.JPG)
![Final](http://v3ga.github.io/Images/Workshop_ECAL_2015_PushPop/Installation_finale_cadavre_exquis.jpg)
![Classroom](http://v3ga.github.io/Images/Workshop_ECAL_2015_PushPop/Setup_classroom_01.jpg)
![Classroom](http://v3ga.github.io/Images/Workshop_ECAL_2015_PushPop/Setup_classroom_02.jpg)


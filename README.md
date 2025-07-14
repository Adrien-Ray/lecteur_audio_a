# lecteur_audio_a

![logo](./assets/ico/logo.png)

 - [usage](#usage)
 - [installation](#installation)
 - [démarrage](#démarrage)
 - [fonctionnalités](#fonctionnalités)

## usage

Outils léger pour géré de la musique en continu, par exemple musique d'ambiance au travail.

## installation

```sh
# download le repository
git pull git@github.com:Adrien-Ray/lecteur_audio_a.git
# entrer dans le repo
cd lecteur_audio_a
# créer le dossier qui contiendra vos musiques accessibles sur le server
mkdir music

# --- mettez-y vos musiques ---

# initialisé le json
bash assets/createData.sh
```

voilà, vous pouvez [démarer le server](#démarrage)

## démarrage

```sh
# démarrer le serveur
python3 -m http.server 8000
```
= > rendez-vous sur [localhost:8000](http://localhost:8000/)

**vous souhaitez rendre l'app accessible via votre box à d'autres appareils?**

```sh
sudo python3 -m http.server 80 --bind 0.0.0.0
# afficher IP local:
hostname -I | awk '{print $1}'
# tapper cette IP depuis n'importe quel appareil connecter sur la même box dans un navigateur
```

## fonctionnalités

vous pouvez lancé la lecture d'une piste en cliquant dessus. si vous souhaité plutôt lire n'importe quel piste aléatoirement, cliquer sur ![random](./assets/ico/shuffle.svg).

vous pouvez également sélectionner plusieurs pistes pour les lire en boucle, via le bouton ![multi-piste](./assets/ico/checklist.svg).

vous pouvez également combiner les modes random et multi-pistes.
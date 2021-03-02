# SO-PEKOCKO


**So-Pekocko** est une application permettant à des utilisateurs d'ajouter des sauces et d'interagir avec les autres en likant :+1: ou dislikant :thumbsdown: leurs sauces. 


# :hammer: Pré-requis

 - Avant de commencer, vous devrez cloner le frontend de l'application à [cette adresse.](https://github.com/OpenClassrooms-Student-Center/dwj-projet6) :blush:


**IMPORTANT** 

Pour des raisons de sécurité, il vous sera necessaire de créer un fichier ```.env``` dans votre dossier backend. Vous devrez ensuite écrire ce qui suit : 

 ```
DB_USER=UserName
DB_PASSWORD=Password
DB_BDD=Bdd
 ```

Afin d'obtenir les variables **UserName**, **Password** et **Bdd** il vous suffit de m'envoyer un mail à [cette adresse.](mailto:etienneromain26@gmail.com?subject=[GitHub]%20demande%20de%20mot%20de%20passe)

## :blue_book: Installation

####  :mag: Côté Frontend :
- Aller sur votre terminal
- Accéder au frontend avec : ```cd frontend```
- Lancer le serveur côté frontend : ```ng serve```
- Garder ce terminal ouvert durant toute votre session sur le site :exclamation:

####  :computer: Côté Backend :
- Ouvrir un second terminal
- Accéder au backend :  ```cd backend```
- Installer NPM : ```npm install```
- Pour utiliser le serveur, chargez le package nodemon :  `npm install -g nodemon`
- Lancer le serveur côté backend :  ```nodemon server```
- Garder ce terminal ouvert durant toute votre session sur le site :exclamation:

####  :cd: Pour finir :

Vous pouvez désormais accéder à l'adresse suivante : [http://localhost:4200/login](http://localhost:4200/login) :clap:

####  :star: Connexion :

Une fois sur l'appli, l'utilisateur devra s'inscrire en donnant une adresse mail et un mot de passe ayant au moins 1 majuscule, 1 minuscule, 1 chiffre et 1 symbole pour un total de 8 caractères minimum.

## Utile à savoir :hand:

#### Le projet à été réalisé avec :

- Node.js ( ainsi que le framework Express)
- Angular
- MongoDB Atlas

## Liste des dépendances NPM

Il faut les installer afin de s'assurer du bon fonctionnement de l'application :

- Express
- Helmet
- Multer
- Body-parser
- Validator
- Mongoose
- Mongoose-unique-validator
- Jsonwebtoken
- Express-rate-limit

(vous pouvez également aller sur le fichier installer.txt pour les commandes)

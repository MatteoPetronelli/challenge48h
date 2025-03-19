# Projet BDS (Bureau Des Sports)

## Description
Ce projet est une application web pour un Bureau Des Sports, permettant aux utilisateurs de s'inscrire, se connecter et interagir avec les événements sportifs. L'application utilise une architecture full-stack avec un backend Node.js/Express et une base de données MongoDB pour stocker les données des utilisateurs et des événements.

## Fonctionnalités
- Inscription et connexion des utilisateurs
- Recherche d'événements sportifs
- Interface utilisateur moderne et responsive
- Gestion des profils utilisateurs

## Technologies utilisées
- **Frontend**: HTML, CSS, JavaScript, Bootstrap 5
- **Backend**: Node.js, Express
- **Base de données**: MongoDB
- **Autres**: Git pour le contrôle de version

## Structure du projet
```
projet-bds/
├── public/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── images/
│   │   │   └── logo.png
│   │   └── js/
│   │       └── scripts.js
│   ├── index.html
│   ├── presentation.html
│   └── formulaire.js
├── server.js
└── README.md
```

## Installation et configuration

### Prérequis
- Node.js (v14.x ou supérieur)
- MongoDB (v4.x ou supérieur)
- npm (v6.x ou supérieur)
- Git

### Étapes d'installation

1. **Cloner le repository**
```
git clone <https://github.com/MatteoPetronelli/challenge48h>
cd challenge48h
```
2. **Installer les dépendances**
```
npm install
```
3. **Configurer la base de données MongoDB**
   - Assurez-vous que MongoDB est installé et en cours d'exécution.
   - La base de données sera automatiquement créée lors du premier démarrage.

4. **Démarrer le serveur**
```
node server.js
```

5. **Accéder à l'application**
   - Ouvrez votre navigateur et accédez à [http://localhost:8080](http://localhost:8080)

## Structure de la base de données
**Base de données:** MyDataBase

**Collections:**
- Clients (utilisateurs inscrits)
- Users (utilisateurs authentifiés)

## API Endpoints
- `POST /client` : Ajouter un nouveau client
- `GET /client` : Récupérer tous les clients

## Contribution
1. Forker le projet
2. Créer une branche pour votre fonctionnalité
```
git checkout -b feature/nouvelle-fonctionnalite
```
3. Commiter vos changements
```
git commit -m 'Ajout d'une nouvelle fonctionnalité'
```
4. Pousser vers la branche
```
git push origin feature/nouvelle-fonctionnalite
```
5. Ouvrir une Pull Request

## Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

## Contact
Pour toute question ou suggestion, n'hésitez pas à nous contacter à [ethanmzi@outlook.fr].

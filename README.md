# ABIRNET

Site vitrine de l'entreprise ABIRNET, spécialisée dans l'installation et la
maintenance des réseaux informatiques, télécoms et électriques.

## Aperçu

Le projet présente les activités, services, références et partenaires
d'ABIRNET dans une interface responsive en français. La page de contact permet
aux visiteurs d'envoyer un message enregistré en base de données puis transmis
par e-mail.

## Fonctionnalités

- navigation responsive avec menu mobile ;
- présentation des services sous forme de cartes interactives ;
- animations, particules et carrousel des partenaires ;
- page dédiée aux références et aux partenaires ;
- formulaire de contact traité en AJAX ;
- enregistrement des messages dans MySQL ;
- notification e-mail via PHPMailer et SMTP Gmail.

## Pages principales

| Page | Description |
| --- | --- |
| `index.html` | Accueil et présentation des métiers |
| `pourquoi-abirnet.html` | Arguments et engagements d'ABIRNET |
| `services.html` | Détail des services proposés |
| `references.html` | Réalisations et références |
| `partenaires.html` | Partenaires de l'entreprise |
| `contact.html` | Coordonnées et formulaire de contact |

## Technologies

- HTML5 et CSS3 ;
- JavaScript vanilla ;
- [Particles.js](https://github.com/VincentGarreau/particles.js/) et Swiper
	chargés depuis un CDN ;
- PHP 7.4 ou version supérieure ;
- MySQL ou MariaDB ;
- [PHPMailer](https://github.com/PHPMailer/PHPMailer) `^6.10` ;
- Composer.

## Installation locale

### 1. Installer les dépendances PHP

Depuis la racine du projet :

```bash
composer install
```

### 2. Créer la base de données

Créer une base nommée `abirnet_db`, puis exécuter :

```sql
CREATE DATABASE abirnet_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE abirnet_db;

CREATE TABLE messages (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	nom VARCHAR(150) NOT NULL,
	email VARCHAR(255) NOT NULL,
	sujet VARCHAR(255) NOT NULL,
	message TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Configurer le formulaire

Dans `envoyer_formulaire.php`, adapter les paramètres suivants à
l'environnement local :

- serveur, utilisateur, mot de passe et nom de la base MySQL ;
- identifiants SMTP et adresse du destinataire ;
- mot de passe d'application Gmail si Gmail est utilisé.

### 4. Démarrer le serveur PHP

Le formulaire nécessite un serveur PHP et ne fonctionnera pas correctement en
ouvrant directement les fichiers HTML avec `file://`. Depuis la racine :

```bash
php -S localhost:8000
```

Puis ouvrir <http://localhost:8000> dans un navigateur.

## Structure du projet

```text
.
├── assets/
│   ├── css/style.css       # Styles du site
│   ├── images/             # Logo, services, références et partenaires
│   └── js/script.js        # Interactions et envoi AJAX du formulaire
├── envoyer_formulaire.php  # Validation, stockage et envoi des messages
├── *.html                  # Pages du site
├── composer.json           # Dépendances PHP
└── vendor/                 # Dépendances installées par Composer
```

## Sécurité et déploiement

- Ne jamais publier les identifiants MySQL ou SMTP dans le dépôt.
- Utiliser des variables d'environnement ou une configuration hors versionnage
	avant toute mise en production.
- Désactiver `display_errors` en production.
- Utiliser un mot de passe d'application SMTP plutôt que le mot de passe du
	compte e-mail.
- Vérifier que le dossier `vendor/` est installé avec `composer install` sur
	l'environnement de déploiement.

## Licence

Aucune licence open source n'est actuellement déclarée dans le projet.

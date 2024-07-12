# Flash Art

Application web pour la réservation de flash tattoos 

## Configurer le projet 

Dupliquer le fichier `.env.example` en nommant la copie `.env` puis le modifier pour faire correspondre à vos besoin. 

## Lancer le projet

```shell
docker-compose up -d
```
Un temps d'attente peut être nécessaire au premier démarrage: les dépendances node mettent du temps à se télécharger

Pour accéder à l'application: [localhost](localhost:5173)
## Initier des données

Se placer dans le fossier `back` puis lancer la commande: 

```shell
npm run mongo 
```

Des données d'utilisateurs, de tattoueurs et de flashs sont initialisées.  
Consulter le fichier `init-mongo.ts` pour plus d'informations.  
Le mot de passe est toujours `password`.

Exemple de compte:
- Admin: admin@admin.com
- Utilisateur: alice@smith.com
- Tattoueur: jack@example.com

Une fois le script exécuté, se connecter à cluster mongo et utiliser la base `challenge` afin de créer l'index de geoloc:
```typescript
db.flashes.createIndex({location: "2dsphere"})
```
## Bruno

Pour tester les requêtes API sans passer par l'application vue, vous pouvez utiliser l'outils [Bruno](https://www.usebruno.com/downloads).  
Depuis Bruno, ouvrez une nouvelle collection et choisir le dossier `bruno` situé à la racine du projet.  
Toutes les requêtes pré-configurées seront déjà accessible. 
# Flash Art

Application web pour la réservation de flash tattoos 

## Configurer le proejt 

Dupliquer le fichier `.env.example` en nommant la copie `.env` puis le modifier pour faire correspondre à vos besoin. 

## Lancer le projet

```shell
docker-compose up -d
```

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
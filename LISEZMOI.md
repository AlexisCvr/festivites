# Festivités Cournonterralaises – version GitHub

Cette version de l'appli est publiée sur GitHub Pages :
- **pas de barre bleue Google** en haut ;
- **le logo des Festivités** comme icône quand on l'installe sur le téléphone.

Les données restent dans le Google Sheet : la page parle au script Apps Script (Code.gs).

## 1. Préparer le serveur (Apps Script)
1. Remplacer **Code.gs** par la dernière version, enregistrer.
2. Déployer > Gérer les déploiements > ✏️ > Version : **Nouvelle version**.
3. Vérifier **« Qui a accès : Tout le monde »** (pas « Tout utilisateur disposant d'un compte Google »).
4. Copier le **lien de l'application Web** (il finit par `/exec`).

## 2. Mettre le lien dans la page
Déjà fait : le lien de ton script est dans `index.html`. Si un jour le lien change, chercher `const API_URL` et le remplacer
(garder les apostrophes autour).

## 3. Publier sur GitHub
1. Créer un compte sur github.com (gratuit).
2. **New repository** → nom : `festivites` → **Public** → Create repository.
3. **uploading an existing file** → glisser **tout le contenu de ce dossier**
   (index.html, manifest.webmanifest, sw.js, le dossier `icones`) → **Commit changes**.
4. **Settings > Pages** → Source : **Deploy from a branch** → Branch : **main**, dossier **/ (root)** → **Save**.
5. Après 1 à 2 minutes, l'appli est en ligne : `https://TON-PSEUDO.github.io/festivites/`

## 4. Installer l'appli sur le téléphone
- **Android (Chrome)** : ouvrir le lien → menu ⋮ → **Installer l'application** (ou « Ajouter à l'écran d'accueil »).
- **iPhone (Safari)** : ouvrir le lien → bouton Partager → **Sur l'écran d'accueil**.

L'icône des Festivités apparaît sur l'écran d'accueil et l'appli s'ouvre en plein écran.

## Mises à jour
- Changement de **Code.gs** : comme avant, dans Apps Script (+ « Nouvelle version » du déploiement).
- Changement de **index.html** : sur GitHub, ouvrir le fichier → crayon ✏️ (ou « Add file > Upload files »
  pour le remplacer) → Commit. En ligne en 1 à 2 minutes.

## Sécurité
Le code de la page est visible sur GitHub, mais il ne contient aucun mot de passe ni aucune donnée.
Chaque action passe par le serveur, qui vérifie la connexion et le rôle de la personne.

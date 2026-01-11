# RadioHub

Projet d'agrégateur de web-radios réalisé dans le cadre du module "Design Patterns".

**Dépôt GitHub :** [https://github.com/AidoTokihisa11/DesignPattern.git]
**Date de rendu :** 11/01/2025  
**Formation :** CDA

## 🚀 Installation & Lancement

Ce projet nécessite **Node.js** installé sur votre machine.

1. **Installer les dépendances**
   ```bash
   npm install
   ```

2. **Démarrer le serveur**
   ```bash
   npx ts-node src/server.ts
   ```

3. **Lancer le scénario de démonstration**
   *Depuis un AUTRE terminal :*
   ```bash
   # Pour Git Bash (Windows) ou Linux/Mac
   bash demo/demo.sh
   ```
   *Ce script simule un abonnement et une diffusion pour montrer les notifications en temps réel.*

4. **Accéder à l'interface**
   Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 🏗 Architecture

Le projet est construit autour de plusieurs Design Patterns pour assurer modularité et respect des principes SOLID :

*   **Façade** (`RadioHubFacade`) : Point d'entrée unique.
*   **Observer** (`Subject/Observer`) : Gestion des abonnements en temps réel.
*   **Factory** (`EmissionFactory`) : Création standardisée des émissions.
*   **Strategy** (`ThemeStrategy`) : Gestion extensible des types de radios.
*   **Iterator** (`CatalogueIterator`) : Parcours uniforme des collections.

## 📂 Structure du code

```
src/
├── interfaces/    # Contrats d'interfaces (IObserver, ISubject...)
├── models/        # Entités métier (Radio, Auditeur, Themes...)
├── patterns/      # Implémentations techniques (Factory, Catalogue...)
├── services/      # Logique applicative (Facade, Registry...)
└── server.ts      # Serveur Web Express
```

## 📝 Documentation
Une documentation technique complète (UML, analyse architecturale) est disponible dans le fichier [DOCUMENTATION.md](DOCUMENTATION.md).

## 🧪 Tests
Vous pouvez utiliser l'interface Web fournie ou le fichier `api_test.http` (avec l'extension VS Code REST Client) pour tester les routes API.

# Documentation des Design Patterns - RadioHub

## Observer
**Problème** : Comment notifier instantanément tous les auditeurs connectés lorsqu'une radio commence une nouvelle émission sans coupler fortement la radio aux auditeurs ?
**Solution** : La classe `Radio` (Subject) maintient une liste d'abonnement d'objets `Auditeur` (Observer). Lors d'un broadcast, elle itère sur cette liste pour appeler la méthode de mise à jour.
**Avantage** : Permet d'ajouter ou de retirer des auditeurs dynamiquement sans modifier la classe `Radio`.

## Iterator
**Problème** : Comment accéder aux éléments de notre catalogue de radios sans exposer sa structure interne (tableau, arbre, liste chaînée) ?
**Solution** : L'interface `IIterator` standardise le parcours (hasNext, next). La classe `Catalogue` fournit un itérateur concret (`CatalogueIterator`) qui traverse sa collection interne.
**Avantage** : Si la structure de stockage du catalogue change (ex: arbre binaire), le code client (API) qui liste les radios n'a pas besoin d'être modifié.

## Composite
**Problème** : Comment traiter de manière uniforme des objets individuels (Radio) et des collections d'objets (Catalogue) ?
**Solution** : Les classes `Radio` et `Catalogue` implémentent toutes deux l'interface `ICatalogueItem`. Un catalogue peut ainsi contenir des radios.
**Avantage** : Simplifie le code client qui peut appeler des méthodes (comme `display` ou `getName`) de la même façon sur une simple radio ou un catalogue entier.

## Façade
**Problème** : Le système contient de nombreuses classes complexes (Registry, Catalogue, Factory, Radio...). Comment simplifier son utilisation pour la couche Web (Express) ?
**Solution** : La classe `RadioHubFacade` offre une interface simplifiée de haut niveau (`subscribe`, `emit`, `createRadio`) qui orchestre en interne les appels aux divers sous-systèmes.
**Avantage** : Réduit le couplage entre le serveur Web et la logique métier. La logique complexe est masquée derrière une API claire.

## Factory (Simple Factory)
**Problème** : Comment créer des instances d'émissions aux formats variés (Musique, Sport, Actu) sans dupliquer la logique d'instanciation partout ?
**Solution** : La classe `EmissionFactory` centralise la logique de création. Elle prend un type en entrée et retourne l'objet JSON/Emission correctement structuré.
**Avantage** : Centralise la logique de création. Si le format d'une émission "Sport" change, on ne modifie que la Factory, pas tout le code client.

## Strategy / Registry
**Problème** : Comment gérer différents comportements (formatage de message) selon le thème de la radio et permettre l'ajout de nouveaux thèmes sans modifier le code existant (Open/Closed) ?
**Solution** : L'interface `IThemeStrategy` définit le contrat. `ThemeRegistry` permet d'enregistrer dynamiquement de nouvelles stratégies au démarrage. La Radio délègue le formatage à sa stratégie.
**Avantage** : On peut ajouter un thème "Cinéma" ou "Politique" simplement en créant une nouvelle classe et en l'enregistrant, sans toucher à la classe `Radio`.

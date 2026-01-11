#!/bin/bash
echo "=========================================="
echo "     DEMO RADIOHUB - TEST AUTOMATIQUE"
echo "=========================================="
echo ""
echo "1. Abonnement de l'auditeur 'Theo' à 'Skyrock'..."
curl -X POST http://localhost:3000/subscribe \
     -H "Content-Type: application/json" \
     -d '{"auditeur": "Theo", "radio": "Skyrock"}'

echo ""
echo ""
echo "2. Diffusion d'une émission sur 'Skyrock'..."
echo "   REGARDEZ LE TERMINAL DU SERVEUR MAINTENANT !"
curl -X POST http://localhost:3000/emit \
     -H "Content-Type: application/json" \
     -d '{"radio": "Skyrock", "type": "Musique", "content": "Le Top 50", "details": {"artist": "Daft Punk", "duration": 240}}'

echo ""
echo ""
echo "Fin de la demo."

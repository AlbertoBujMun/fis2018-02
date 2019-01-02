#!/usr/bin/env bash
curl -X PUT \-H "Content-Type: application/json" \
   -d @pacts/client-proyectoservice.json \
http://localhost:8080/pacts/provider/ProyectoService/consumer/client/version/2.0.0
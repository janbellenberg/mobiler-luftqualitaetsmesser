#!/bin/sh
cd ..
docker build -t mlqm-web:latest ./react/mobiler-luftqualitaetsmesser/
docker build -t mlqm-api:latest ./web/api/
#!/bin/bash
cd ..

mkdir ~/mlqm
mkdir ~/mlqm/db
mkdir ~/mlqm/db-init
mkdir ~/mlqm/nginx
mkdir ~/mlqm/nginx/logs

cp ./db/db.sql ~/mlqm/db-init/init.sql
cp ./web/nginx.conf ~/mlqm/nginx/default.conf
#!/bin/bash
createdb -U postgres -T template0 createx;
pg_restore --verbose --clean -U postgres --dbname createx /backup-createx.sql;
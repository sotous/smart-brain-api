-- Deploy fresh dababase tables
\i '/docker-entrypoint-initdb.d/tables/user.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/seed/seed.sql'
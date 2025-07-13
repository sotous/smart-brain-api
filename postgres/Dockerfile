FROM postgres:16-alpine

ADD /tables/ /docker-entrypoint-initdb.d/tables/
ADD /deploy_schemas.sql /docker-entrypoint-initdb.d/deploy_schemas.sql
ADD /seed/seed.sql /docker-entrypoint-initdb.d/seed/seed.sql
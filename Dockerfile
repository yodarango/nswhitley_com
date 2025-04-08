FROM postgres:13

# Impostare variabili d'ambiente generali per PostgreSQL
ENV POSTGRES_DB=app_development
ENV POSTGRES_USER=app_server

# Crea una directory per i log e altre configurazioni
RUN mkdir -p /private/var/www/websites/temp/nswhitley/app/log

# Imposta la directory di lavoro
WORKDIR /private/var/www/websites/temp/nswhitley/app

# Esponi la porta 5432 per PostgreSQL
EXPOSE 5432

# Comando per avviare PostgreSQL
CMD ["postgres"]

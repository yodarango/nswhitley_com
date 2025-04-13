#!/bin/bash
docker run -d --name nswhitley_db --env-file .env -p 5432:5432 nswhitley_db
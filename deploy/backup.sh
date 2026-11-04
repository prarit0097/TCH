#!/bin/sh
set -eu
umask 077
cd /opt/circadian-hospital
mkdir -p backups
backup_file="backups/circadian-$(date -u +%Y%m%dT%H%M%SZ).sql.gz"
# Write to a temporary path; never label a failed dump as a completed backup.
docker compose -p circadian exec -T db pg_dump -U circadian -d circadian > "$backup_file.sql.tmp"
gzip -c "$backup_file.sql.tmp" > "$backup_file.tmp"
gzip -t "$backup_file.tmp"
mv "$backup_file.tmp" "$backup_file"
rm "$backup_file.sql.tmp"
printf 'Backup saved: %s\n' "$backup_file"

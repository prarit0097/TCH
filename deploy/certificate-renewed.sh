#!/bin/sh
set -eu
if [ "${RENEWED_LINEAGE:-}" = "/etc/letsencrypt/live/thecircadianhospital.com" ]; then
    nginx -t
    systemctl reload nginx
fi

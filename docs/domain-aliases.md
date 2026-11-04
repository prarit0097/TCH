# Additional hospital domains

The owner requested `drbrccircadianhospital.com` and `circadianhospital.com` on 4 November 2026. Both apex A records point to 187.127.132.106; their www CNAMEs point to the matching apex, with no AAAA record observed.

Use the same website through permanent, path-and-query-preserving redirects to the existing primary `https://thecircadianhospital.com`. This keeps the established canonical URLs, enquiries, staff authentication and sitemap on one origin.

Dedicated virtual host: `/etc/nginx/sites-available/circadian-hospital-aliases`, linked from sites-enabled. Source: `deploy/domain-aliases.conf`. Bootstrap only its HTTP block before issuing a separate certificate named `circadian-hospital-aliases`, covering both apex and www names with webroot `/var/www/circadian-acme`. Then install the complete configuration, validate with `nginx -t` and reload. The certificate's renewal deploy hook validates/reloads Nginx. Do not alter the original certificate or other virtual hosts.

Verify HTTP/HTTPS for all four names, redirect status/location including a nested path and query, the primary homepage/API, and existing hosted sites. No application/container/database rebuild is needed.

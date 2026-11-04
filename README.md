# The Circadian Hospital

Astro/TypeScript public website with a Django reception API and PostgreSQL production database. Production domain: https://thecircadianhospital.com. Public content is static HTML; Python is used for enquiries and authenticated staff administration.

## Development

Requires Node 24 and Python 3.13. Install with `npm ci`, `python -m venv .venv`, then `.venv/Scripts/python -m pip install -r backend/requirements.txt` on Windows (use `.venv/bin/python` on Linux). Run `npm run dev` for http://127.0.0.1:4321.

Local backend: set `DJANGO_DEBUG=true`, run `python backend/manage.py migrate`, then `python backend/manage.py runserver 127.0.0.1:8000`. Local-only development uses SQLite unless PostgreSQL is configured. Set `PUBLIC_ENQUIRY_API=/api` when starting Astro to test the proxy-backed request form. The form defaults to explicitly preparing a WhatsApp message; it never claims that a request was saved without a connected API.

## Verification

`npm run check`, `npm run build`, `npm run verify`. Browser checks: `node scripts/browser-check.mjs` with installed Chrome and `CHROME_PATH` when needed. Backend: set `DJANGO_TESTING=true` and run `python backend/manage.py test enquiries`. CI supplies PostgreSQL, not SQLite. Never run destructive tests against a production database; Django creates a separate test database.

## Content and search

Shared identity, content pages and journal entries: `src/data/site.ts`. Homepage: `src/pages/index.astro`. Navigation/footer/layout: `src/components` and `src/layouts`. Palette/layout: `src/styles`.

`PUBLIC_INDEXABLE=false` is the default for Sites review. Production build must use `PUBLIC_INDEXABLE=true PUBLIC_ENQUIRY_API=/api`; Compose sets these. Canonicals and sitemap point to the real domain. Submit the sitemap to the owner's verified Search Console and set the matching website/appointment link in the verified Google Business Profile. No analytics identifiers, fake reviews, rating markup, hours or unverified departments are included. Website implementation cannot by itself guarantee traffic or local rankings.

## Hostinger release

1. Inspect server resources, occupied ports, existing virtual hosts and DNS. Use a new `/opt/circadian-hospital` directory and Compose project `circadian`; preserve all existing services. This configuration binds only 127.0.0.1:8088 and exposes no database port.
2. Copy source and create `.env` from `deploy/.env.example`. Generate independent strong random values on the server; chmod 600. Never commit credentials.
3. `docker compose -p circadian build` then `docker compose -p circadian up -d db`. Run `docker compose -p circadian run --rm backend python manage.py migrate` and `docker compose -p circadian run --rm backend python manage.py collectstatic --noinput` before starting backend/web.
4. `docker compose -p circadian up -d`. Verify internal homepage and API readiness with the intended Host and X-Forwarded-Proto headers. Run `docker compose -p circadian exec -T backend python manage.py check --deploy`.
5. Ensure the domain has only the intended server A/AAAA records and www points consistently to it. Parking IPs must not coexist. Install a NEW HTTP virtual host for this domain with an ACME webroot; do not replace another site's config. Obtain a certificate with the host's certbot. Adapt `deploy/host-nginx.conf`, run `nginx -t`, then reload only after validation. Never bypass browser certificate warnings or call a self-signed certificate production TLS.
6. Test HTTPS, www redirect, sitemap, robots, CSRF flow and one clearly labelled test enquiry. Confirm it in PostgreSQL/admin and remove only that exact test fixture. Verify unrelated existing sites still respond.
7. Staff account: owner runs `docker compose -p circadian exec backend python manage.py createsuperuser` interactively and stores their credentials privately. Staff UI is `/staff/`. Create a limited staff user with enquiry permissions for daily reception work; do not share a superuser account. No default account or password is supplied.

## Backups and retention

Run `sh deploy/backup.sh` from the deployment directory and check the gzip output. Store encrypted copies off-server through an owner-approved destination; on-server backups alone do not protect against losing the VPS. Proposed operational task: daily database backup, alert on failure, and routine restore tests in an isolated database. Do not delete old backups without an agreed retention policy.

Restore into an isolated test database first using `gunzip -c <backup> | docker compose -p circadian exec -T db psql -U circadian -d <isolated_database>`; verify counts and a sample before planning any production restore. Never replace the live database as an automatic deployment step.

Reception record cleanup is deliberately dry-run by default: `python manage.py cleanup_enquiries --days <approved-retention-days>`. Add `--apply` only after confirming the hospital's policy and reviewing the counts. Delete expired rate buckets through the same command. Configure daily cleanup after retention is agreed.

## Rollback and operations

Keep the previous source archive and built image tags before updating. Rebuild/restart only project `circadian`; roll back frontend/backend images together. Preserve the PostgreSQL volume. Never use `docker compose down -v` as a routine rollback. Review schema migrations for backwards compatibility; restore from a tested backup only under an explicit recovery plan.

Reception views new requests in Django admin; no email/SMS delivery integration is configured. API responses mean receipt only. Call and WhatsApp remain immediate alternatives. Host OS and application/container patching, uptime monitoring, backup alerts and staff access management remain operational responsibilities.

## Asset provenance and launch details

`docs/asset-sources.md` and `/image-credits/` describe licences and attribution. Nature/food images are illustrative. The Dr BRC portrait comes from the official site supplied by the owner; confirm reuse rights. Replace illustrative nature with actual hospital photos when supplied. Confirm treating clinicians, hours, hospital legal operator/privacy contact and service availability before expanding clinical marketing pages. This website is not a patient-record or emergency-response system.

Brand/content redesign checks: node scripts/redesign-check.mjs covers nine routes at four viewport widths, the official logo, enlarged-text navigation and reduced motion. Source/photo research is in docs/research; supplied logo originals are in public/brand.

# Deployment and verification

Date: 4 November 2026. Production: https://thecircadianhospital.com. GitHub: https://github.com/prarit0097/TCH. The server clones/pulls this repository; no direct source-archive deployment is used.

## Isolation

- Application checkout: `/opt/circadian-hospital`.
- Compose project: `circadian`; private project network and named PostgreSQL/static volumes.
- Web listener: `127.0.0.1:8088`; backend and database have no host-published ports.
- Dedicated host Nginx virtual host `/etc/nginx/sites-available/circadian-hospital` and matching enabled symlink. No pre-existing virtual host was overwritten.
- Per-service memory/CPU ceilings protect the other applications on this VPS. Backend image dependency downloads use host networking only at build time, after comparative network diagnosis; runtime services remain private.
- Runtime `.env` and backups stay outside Git; backups are also excluded from Docker build context.

## Verified

- Astro check: 0 errors, warnings or hints; 15 generated HTML pages.
- Static checks: unique titles/descriptions, canonical URLs, JSON-LD, 354 local references and matching robots policy.
- Preview is noindex, production is indexable with the domain sitemap.
- Local browser checks at 375/768/1440/1920px: no horizontal overflow, images loaded, navigation Escape behavior and persistent theme. Explicit WhatsApp preview fallback and no-JavaScript form protection checked.
- Django tests: 7 pass locally and with PostgreSQL on the server. GitHub Actions also runs the PostgreSQL service-backed suite.
- External HTTPS requests to homepage, contact, DIP Diet, robots, sitemap and API health: 200. HTTP and www redirect to canonical HTTPS.
- A real HTTPS enquiry returned 201 and was saved. Repeating its request ID returned 200 with the same reference; missing CSRF returned 403 and missing consent returned 400. The exact synthetic enquiry was removed afterward; no patient data was used.
- Bounded external smoke test: 60 homepage requests at concurrency 12, all 200; median observed request time 0.144s from the test client. This is not a daily visitor capacity guarantee.
- Sample existing sites (PDF, Nirogidhara, Postzyo, RIIMS and API gateway) remained reachable with HTTP 200 after adding the new virtual host.
- A compressed PostgreSQL backup was created and gzip-tested. Off-server backup storage is not configured.
- Valid Let's Encrypt certificate for apex and www. Expiry at issue: 2 February 2027. Certbot renewal is installed; this project's deploy hook reloads Nginx only when its own certificate renews.
- Fresh reviewer identified a no-JavaScript form data leak; fixed before release. No remaining material code blockers were reported.

## Accounts and operating notes

Reception staff URL: `/staff/`. A limited staff account can view enquiries and update status. Its generated initial password is saved in a private file outside the Git checkout, not in this repository or the chat. Hospital owner should change it after initial sign-in. No default/shared superuser account is created.

Enquiries are reviewed in the staff dashboard; email/SMS notifications are not configured. Calls and WhatsApp work independently. Record retention must be agreed with the hospital before applying cleanup. Search Console and verified Google Business Profile administration still require the owner's account access; no ranking/traffic promise is made.

## Design and content limits

Nature and food photography is explicitly illustrative; actual facility photos, clinical team details and hours should be supplied before expanding those sections. Portrait comes from the owner-provided official Dr BRC source. Do not invent services, medical qualifications, ratings or cure claims.

Hallmark rendered checks informed focus contrast, layout cap and controls. Its remaining strict house-style findings concern footer screen word density and section spacing; these are not represented as a clean Hallmark pass. Essential hospital navigation, address and medical context were retained. Impeccable's observed side-accent warning was resolved. Django's deployment check retains two intentional advisory warnings: HSTS does not claim all possible subdomains or preload eligibility. No subdomain-wide policy was imposed on the owner's domain.

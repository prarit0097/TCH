# TCH official-brand redesign: UI/UX direction

Date: 2026-11-04. Scope: design research and implementation recommendations; no application code changed by this research task.

## Recommendation

Use a white, charcoal and restrained red medical editorial identity, anchored by the supplied official logo and a real Dr BRC portrait. The current green photographic field, Prata headlines and forest imagery read as a retreat or wellness destination. The hospital name, location, person and practical patient actions should instead establish the page immediately. Keep the existing strengths: generous spacing, simple navigation, semantic HTML, clear reception links, visible keyboard focus and restrained motion.

The official logo is the authority for brand identity: red cross, yellow winged horse and black lettering on white. Preserve the supplied asset, proportions and white background. Do not recreate the horse, trace it inaccurately, invert the logo in dark mode, or substitute the current invented botanical symbol. Its yellow is an identity accent, not a readable text color.

## Skill research and fit assessment

Read `C:/Users/hp/.agents/skills/ui-ux-pro-max/SKILL.md`, its quick reference and professional-quality rules. Reviewed the existing `DESIGN.md`, homepage, tokens, global CSS, header and package manifest. The stack is Astro 7.4.5; the existing local font dependencies are Prata and Manrope. There was no existing `design-system/` directory to overwrite. The existing `DESIGN.md` should be deliberately revised during implementation so it describes the new identity rather than preserving contradictory forest guidance.

Executed these searches without persistence or force:

```text
python C:/Users/hp/.agents/skills/ui-ux-pro-max/scripts/search.py "hospital medical editorial trust" --design-system -p "TCH Hospital" -f markdown
python C:/Users/hp/.agents/skills/ui-ux-pro-max/scripts/search.py "responsive image navigation" --stack astro
```

The design-system result matched **Accessible & Ethical**, explicitly suitable for healthcare, with a mission/credibility → proof → overview → clear CTA sequence and Figtree/Noto Sans typography. Its generic teal/green palette and sales/quote CTA language are poor fits for the supplied identity and patient task; do not copy these defaults. Its suggested logo/certification proof must only appear when the hospital supplies verifiable evidence. Do not add a carousel, badges or numbers merely because the search suggested them.

The Astro search returned responsive-picture and image-optimization guidance. Use responsive sizes and explicit image dimensions. Its media-player persistence result does not apply here. No need to introduce a client framework or animation package.

## Concrete palette

These are proposed UI tokens, not asserted samples from the supplied logo. Keep the logo's original pixels/colors unchanged.

| Role | Light | Dark | Use |
|---|---|---|---|
| Main surface | `#FFFFFF` | `#14171B` | Main reading field |
| Alternate surface | `#F5F5F2` | `#1E2329` | Gentle section separation |
| Warm brand surface | `#FFF8E8` | `#28241B` | Small editorial note or image ground |
| Main text | `#20252B` | `#F4F5F6` | Headlines, body |
| Secondary text | `#535B63` | `#BBC2C9` | Supporting copy |
| Divider | `#D7DBDF` | `#48515C` | Rules and grouped sections |
| Primary action | `#AF2633` | `#F29AA3` | Reception CTA/link emphasis |
| On primary | `#FFFFFF` | `#33131A` | Button labels |
| Action hover | `#8E1E29` | `#FFC0C6` | Pointer feedback |
| Gold accent | `#E4B43B` | `#E4B43B` | Small lines/markers, never body text |
| Focus ring | `#175BA6` | `#8CBFFF` | Visibly independent from red brand |

Use approximately 80–85% neutral surfaces, with red confined to a few actions and section accents. Avoid competing large red and yellow panels. Meaningful text must pass 4.5:1; meaningful controls/non-text states need 3:1 where applicable. These candidates require final contrast verification against their actual composed backgrounds. Retire the forest/lime token vocabulary when its UI use disappears; semantic tokens are easier to maintain.

## Typography

Recommended smallest change: use the already self-hosted **Manrope** for both headings and body, with headings 600–700 and body 400–500. This supplies a serious, consistent medical identity without another download. The search's Figtree/Noto Sans pairing is a valid alternative only if a font change is wanted; it is not necessary for this redesign. Avoid Prata as the dominant hero face because its luxury/editorial character reinforces the retreat impression.

- Desktop hero: 52–66px, line height 1.08–1.14, controlled 14–18ch measure; use a concrete headline rather than making giant type the only source of hierarchy.
- Mobile hero: 34–42px, natural balanced wrapping, no forced nonbreaking phrases.
- Section headings: 30–42px desktop, 27–32px mobile. Body: 16–18px, line height 1.6–1.75, 55–70ch maximum for reading.
- Navigation and important practical details: 14–16px. Current 12–13px desktop navigation and very small captions should grow where space permits.
- Avoid excessively tracked all-caps text and faux thin weights. Use a small eyebrow, one clear heading, a short paragraph and action group rather than several competing title styles.

## Header and hero

1. Keep a small utility row for location and reception phone, then a white header with the official logo. Size the complete logo for legibility rather than shrinking black lettering into an unreadable thumbnail. Avoid a duplicate invented wordmark beside a complete official wordmark.
2. Use four clear navigation items and one primary `Plan a visit` / `Contact reception` action. If the logo makes tablet widths cramped, switch to mobile navigation earlier rather than squeezing links.
3. Replace the forest hero with a light split composition: copy on the left, actual Dr BRC portrait on the right, approximately 55:45. A thin red rule, warm neutral photo background and a short factual caption provide distinction without decoration. No copy over a face, fake clinic interior or busy photography.
4. Example hierarchy: `THE CIRCADIAN HOSPITAL · FARIDABAD` → `A considered approach to everyday health.` → clear factual copy naming Dr BRC and explaining that reception can help arrange a visit. Avoid implying a guaranteed result or that a particular person will be available for every visit.
5. The strongest literal alternative headline is `The Circadian Hospital, Faridabad.` if the copy needs to prioritize recognition over brand language. Put Dr BRC's association visibly in the supporting line or portrait caption.
6. Primary CTA: contact/plan a visit; secondary: learn about Dr BRC. Keep the phone number immediately visible. Use `Book an appointment` only if the action actually confirms an appointment; the current contact flow does not.
7. Desktop hero around 540–620px, but never fixed to that height on mobile. Mobile order: identity, headline, short copy, actions, then portrait. Keep the initial text/action portion compact enough that the real portrait is close to the first viewport rather than a distant section.

## Page structure

Suggested homepage order:

1. Official header and Dr BRC-led hero.
2. Compact practical information strip: location, reception contact, and capacity only if it remains owner-confirmed. No animated counters. Existing 250-bed wording is a supplied fact in the project, not independently verified in this design research.
3. Concise hospital introduction: what a visitor can learn and how to begin. Reduce vague poetic copy.
4. Three restrained overview links: Dr BRC, DIP Diet, patient guide/circadian approach. Use ruled rows or a disciplined simple grid, not a dashboard of floating cards.
5. Dr BRC profile/editorial section with an authentic second image only if available. If hero already uses the sole portrait, avoid duplicating the same crop prominently again; use a compact profile statement/link instead.
6. DIP Diet education with context and careful individual-advice language; one real relevant image may accompany it. Stock apples can remain a secondary illustrative asset, clearly identified, but should not dominate the brand story.
7. Visit/contact panel with full address and directions; preserve map/address caveats where appropriate.
8. Short FAQ and journal links, followed by a practical reception directory footer.

Move the large tree-path section out of the primary narrative. Nature can illustrate a circadian article where explicitly captioned, but it should not imply these are hospital grounds. Prefer authentic hospital photos supplied or verified by the user as future replacements.

## Mobile, dark mode and accessibility

- Use a single-column hero below tablet width. Preserve the face and upper body with deliberate `object-position`; inspect the crop at 375px rather than relying on the desktop image crop.
- Keep all current 44px minimum website tap targets. Allow contact actions and long labels to wrap. Current global `white-space: nowrap` rules on buttons/text links deserve review at narrow widths and 200% zoom.
- Retain `aria-expanded`, `aria-controls`, named theme/menu buttons, current-page state, skip link and logical heading order. Verify Escape, menu closure on navigation and focus behavior, not only the visual menu state.
- Keep the fixed mobile call/WhatsApp bar only if page padding reserves its full height plus safe area. Verify focused links/form fields near the footer are never behind it. Keep its wording factual; WhatsApp is an external messaging handoff.
- Dark mode: neutral charcoal surfaces, light text and lighter red action tokens; render the official logo in a deliberate white plate with modest padding. Do not invert/recolor it or force the rest of the header to white. Keep photographs unfiltered. Check muted copy, borders, states and links independently in both themes.
- Use a 3px focus ring with offset, retaining sufficient contrast in light/dark surfaces and on primary actions. Color must not be the only error/state cue.
- Support reduced motion and visible content without JS. No autoplay, parallax, decorative count-up or reveal animation that hides content before JavaScript runs.
- Promote the new hero image to eager/high-priority loading and demote the removed forest image. Reserve its dimensions. Use WebP/AVIF and responsive widths; keep below-fold media lazy. Do not preload all fonts/images.

## Trust and content pitfalls

Use verified specifics: official identity, real named portrait, exact address, reachable reception, clear visit process, source-linked educational material. A professional appearance does not require outcome statistics, invented accreditations, fabricated testimonials, fake reviews or implied emergency service hours. Do not invent professional qualifications, specialist availability or a clinical title beyond verified supplied naming. Retain the project's distinction between general circadian biology and evidence for a named protocol. Keep medication/individual-advice wording where it directly helps readers understand the nutrition content; do not cover the homepage in repetitive disclaimers.

The supplied official logo includes a red cross. Use the supplied identity as supplied; do not repeat that symbol as a generic navigation icon, background pattern or invented certification badge.

## Review checklist for implementation

- Homepage identifies hospital, Faridabad, Dr BRC and reception action without scrolling through abstract storytelling.
- Official logo is sharp, undistorted, unfiltered and readable in both themes; no invented botanical mark remains.
- Hero visibly uses actual Dr BRC imagery and preserves a sensible crop at 375, 768, 1024 and 1440px.
- No hospital/portrait/medical claims are inferred from stock photography.
- Navigation, contact form and footer function by keyboard; focus is not obscured by sticky UI.
- Measure all used text/action contrast pairs, including hover and dark mode; check 200% zoom and landscape.
- No horizontal overflow; long link/button labels reflow rather than being clipped by global overflow rules.
- New image dimensions are explicit, hero is not lazy-loaded, unnecessary large nature images stop loading on the homepage.
- Run the existing Astro/build verification and inspect actual light/dark desktop/mobile renders before claiming completion.

This is design guidance based on local project and skill evidence. No live clinical facts, claims or third-party image rights were independently verified by this research subtask.

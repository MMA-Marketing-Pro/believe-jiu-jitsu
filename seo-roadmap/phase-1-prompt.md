# Phase 1 — Foundation: Tier-1 Neighborhoods + Core Glossary (26 pages)

> Paste this entire prompt into a fresh Claude Code session inside the `client-redesign-kit` repo when you're ready to ship Phase 1.

---

## Context

You are continuing the **Believe Jiu Jitsu** site at `sites/believe-jiu-jitsu/` inside this repo. The site was already built (6 content pages + booking.html) and is live on GitHub / Cloudflare Pages.

Your job: build **26 new programmatic local-SEO pages** as Phase 1 of the 6-month roadmap.

**Before you start, read these files:**
- `.agent/skills/site-redesign/SKILL.md` — component patterns, mobile quality bar, lead-modal rules
- `.agent/skills/taste-skill/SKILL.md` — premium design system
- `.agent/skills/performance-athletic-skill/SKILL.md` — the design style used on this site
- `.agent/skills/seo-audit/SKILL.md` — run against new pages when done
- `.agent/skills/programmatic-seo/SKILL.md` — the playbook
- `sites/believe-jiu-jitsu/brand-kit.json` — color and type system (electric green `#37CA37` on `#0A0A0A`, Barlow Condensed + Inter + JetBrains Mono)
- `sites/believe-jiu-jitsu/content-profile.json` — real scraped business content
- `sites/believe-jiu-jitsu/seo-roadmap/keywords.json` — full keyword inventory
- `sites/believe-jiu-jitsu/seo-roadmap/roadmap.md` — big-picture plan
- `sites/believe-jiu-jitsu/styles.css` — **reuse the existing design system, do not duplicate CSS**
- `sites/believe-jiu-jitsu/index.html` — reference for nav, lead modal, footer markup to copy onto every new page

## Phase 1 Objective

Ship the **foundation layer** — the 4 highest-ROI Tier-1 neighborhoods (Cane Bay, Nexton, Summerville Downtown, Sangaree) each get 5 pages (1 neighborhood hub + 4 service pages), plus 6 foundational glossary pages that anchor the `/learn/` cluster.

**Total:** 20 location pages + 6 glossary pages = **26 pages**.

## Folder Structure To Create

```
sites/believe-jiu-jitsu/
  locations/
    index.html                           ← Locations master hub
    cane-bay/
      index.html                         ← Cane Bay hub
      brazilian-jiu-jitsu.html
      kids-jiu-jitsu.html
      no-gi-jiu-jitsu.html
      homeschool-jiu-jitsu.html
    nexton/
      index.html
      brazilian-jiu-jitsu.html
      kids-jiu-jitsu.html
      no-gi-jiu-jitsu.html
      homeschool-jiu-jitsu.html
    summerville-downtown/
      index.html
      brazilian-jiu-jitsu.html
      kids-jiu-jitsu.html
      no-gi-jiu-jitsu.html
      adult-jiu-jitsu.html
    sangaree/
      index.html
      brazilian-jiu-jitsu.html
      kids-jiu-jitsu.html
      no-gi-jiu-jitsu.html
      adult-jiu-jitsu.html
  learn/
    index.html                           ← Glossary hub
    what-is-brazilian-jiu-jitsu.html
    what-is-no-gi-jiu-jitsu.html
    what-is-a-gi.html
    what-is-open-mat.html
    what-to-wear-to-your-first-bjj-class.html
    how-to-prepare-for-your-first-bjj-class.html
```

(Note: for pages inside subfolders, update relative paths — `../../styles.css`, `../../scripts.js`, `../../images/...`.)

## Page-Level Specs

### Pattern A — Location × Service Page (16 total)

**URL example:** `/locations/cane-bay/kids-jiu-jitsu/index.html`

**Title tag template (55 chars):** `Kids Jiu-Jitsu in Cane Bay, SC | Believe Jiu Jitsu`

**Meta description (155 chars):** `Kids Brazilian Jiu-Jitsu classes in Cane Bay, SC at Believe Jiu Jitsu. AOJ Black Belt coaching for ages 5-13. Book your child's free trial today.`

**H1:** `Kids Jiu-Jitsu in Cane Bay, SC`

**Required sections (in order):**
1. Page header with breadcrumb: Home / Locations / Cane Bay / Kids Jiu-Jitsu
2. Hero: H1 + 2-sentence subheadline mentioning the specific neighborhood + primary CTA
3. **Neighborhood intro paragraph** — name a specific subdivision, landmark, or school in the neighborhood. Mention drive time to the gym.
4. Class-time callout — pull 2-3 relevant classes from `content-profile.json` (e.g., for Kids BJJ: Monday 4:15 PM Little Kids Gi, Monday 5:00 PM Big Kids Gi)
5. Why families in {neighborhood} choose Believe — 3-point bullet block with neighborhood-specific reasoning
6. Rotated testimonial (pick from the 6 in `content-profile.pageContent.home.testimonials`)
7. FAQ block (3 Qs, at least one locally specific)
8. Map + address block (embed Google Maps, same pattern as homepage)
9. Cross-links to 2 sibling pages + parent hub + 1 glossary page
10. Closing CTA
11. Standard nav (active link = "Programs" or add "Locations" as nav item — keep consistent)
12. Standard footer with "Powered by MMA Marketing Pro"

**Required schema (JSON-LD in `<head>`):** `BreadcrumbList` + `Service` (with `areaServed: { "@type": "Place", "name": "Cane Bay, SC" }`) + `FAQPage`. Reference the homepage LocalBusiness via `"provider": { "@id": "https://believejiujitsu.com/#org" }`.

**Internal links out:**
- To parent: `/locations/cane-bay/`
- To 2 siblings: e.g. from Kids → link to Brazilian Jiu-Jitsu + No-Gi in same neighborhood
- To 1 glossary: `/learn/what-is-brazilian-jiu-jitsu/`
- To main schedule: `/class-schedule.html`

**Lead modal:** same modal pattern from `index.html`. The program dropdown pre-selects based on the service — e.g., on Kids Jiu-Jitsu in Cane Bay, the modal opens with `big-kids` pre-selected.

### Pattern B — Neighborhood Hub (4 total)

**URL example:** `/locations/cane-bay/index.html`

**Title tag:** `Martial Arts in Cane Bay, SC | Believe Jiu Jitsu`

**Meta description:** `Brazilian Jiu-Jitsu for kids, teens, and adults in Cane Bay, SC. Gi, No-Gi, and homeschool classes at Believe Jiu Jitsu — AOJ Black Belt coaching.`

**Sections:**
1. Hero with neighborhood name in H1
2. Neighborhood intro (2 paragraphs, genuinely specific to the area — subdivisions, roads, family profile)
3. 4-up grid linking to the service pages for this neighborhood
4. Schedule preview (3 most-relevant classes)
5. Map + directions from neighborhood landmark
6. Testimonial
7. Cross-link to 2 other neighborhood hubs + main schedule
8. CTA

**Schema:** `Place` + `BreadcrumbList` + `ItemList` of services available.

### Pattern C — Locations Master Hub (1 page)

**URL:** `/locations/index.html`

**Title:** `Service Area | Believe Jiu Jitsu Summerville SC`

Shows a grid of all 10 neighborhoods (link the 4 live hubs in Phase 1, grey-out or "coming soon" the other 6 that won't be built until Phase 2-4). Lists the counties served, a driving-time chart, and the full gym address.

### Pattern D — Glossary Pages (6 total)

**URL example:** `/learn/what-is-no-gi-jiu-jitsu.html`

**Title:** `What Is No-Gi Jiu-Jitsu? Beginner's Guide | Believe Jiu Jitsu`

**Meta description:** `No-Gi Jiu-Jitsu is grappling without the traditional Gi. Learn what No-Gi is, how it differs from Gi, and how to start training in Summerville, SC.`

**H1:** `What Is No-Gi Jiu-Jitsu?`

**Sections:**
1. Page header with breadcrumb Home / Learn / What Is No-Gi Jiu-Jitsu
2. 1-paragraph direct answer at the top (Google featured-snippet style)
3. Key differences vs. Gi (table)
4. Who No-Gi is best for
5. What to wear
6. What you'll learn in a No-Gi class
7. 3-question FAQ
8. **Local tie-in:** "No-Gi in Summerville, SC" paragraph linking to `/locations/cane-bay/no-gi-jiu-jitsu/` + `/locations/nexton/no-gi-jiu-jitsu/`
9. CTA (primary: Book Free No-Gi Trial)

**Schema:** `DefinedTerm` + `BreadcrumbList` + `FAQPage` + `Article` (with author `@id` = Professor Randy for E-E-A-T).

### Pattern E — Glossary Hub (1 page — part of the 6 glossary total)

**URL:** `/learn/index.html`

**Title:** `BJJ Learn Center | Believe Jiu Jitsu Summerville SC`

Links to all planned glossary pages. Grey-out the pages not built until Phase 4.

## Complete Page List for Phase 1

| # | Path | Type |
|---|---|---|
| 1 | `/locations/index.html` | Locations master hub |
| 2 | `/locations/cane-bay/index.html` | Neighborhood hub |
| 3 | `/locations/cane-bay/brazilian-jiu-jitsu.html` | Service page |
| 4 | `/locations/cane-bay/kids-jiu-jitsu.html` | Service page |
| 5 | `/locations/cane-bay/no-gi-jiu-jitsu.html` | Service page |
| 6 | `/locations/cane-bay/homeschool-jiu-jitsu.html` | Service page |
| 7 | `/locations/nexton/index.html` | Neighborhood hub |
| 8 | `/locations/nexton/brazilian-jiu-jitsu.html` | Service page |
| 9 | `/locations/nexton/kids-jiu-jitsu.html` | Service page |
| 10 | `/locations/nexton/no-gi-jiu-jitsu.html` | Service page |
| 11 | `/locations/nexton/homeschool-jiu-jitsu.html` | Service page |
| 12 | `/locations/summerville-downtown/index.html` | Neighborhood hub |
| 13 | `/locations/summerville-downtown/brazilian-jiu-jitsu.html` | Service page |
| 14 | `/locations/summerville-downtown/kids-jiu-jitsu.html` | Service page |
| 15 | `/locations/summerville-downtown/no-gi-jiu-jitsu.html` | Service page |
| 16 | `/locations/summerville-downtown/adult-jiu-jitsu.html` | Service page |
| 17 | `/locations/sangaree/index.html` | Neighborhood hub |
| 18 | `/locations/sangaree/brazilian-jiu-jitsu.html` | Service page |
| 19 | `/locations/sangaree/kids-jiu-jitsu.html` | Service page |
| 20 | `/locations/sangaree/no-gi-jiu-jitsu.html` | Service page |
| 21 | `/locations/sangaree/adult-jiu-jitsu.html` | Service page |
| 22 | `/learn/index.html` | Glossary hub |
| 23 | `/learn/what-is-brazilian-jiu-jitsu.html` | Glossary |
| 24 | `/learn/what-is-no-gi-jiu-jitsu.html` | Glossary |
| 25 | `/learn/what-is-a-gi.html` | Glossary |
| 26 | `/learn/what-to-wear-to-your-first-bjj-class.html` | Glossary |

## Unique-Content Requirements Per Page

Every new page must include **at least 5 of these 8 elements** (see `roadmap.md` for full list):

1. Neighborhood-specific intro paragraph (real landmarks/subdivisions/schools)
2. Locally reasoned "why train here" angle
3. 2-3 real class times from the schedule
4. One testimonial rotated across pages
5. Locally specific FAQ
6. Embedded map OR page-specific photo
7. Contextual internal links (2 sibling + 1 parent + 1 glossary)
8. Locally specific CTA copy

## Nav Update

Add a "Locations" link to the primary navbar on ALL existing pages + new pages, positioned between "Schedule" and "Contact". Update the mobile menu too. Don't forget `<a class="active">` for the current page. (You'll need to edit `index.html`, `about.html`, `class-schedule.html`, `contact.html`, `privacy-policy.html`, `terms-and-conditions.html` to add the new nav item.)

Also add a "Learn" link to the footer's "Academy" column on all pages.

## Agency Attribution — MANDATORY

Every single new HTML file must include this line in the footer (match the existing pages' markup):

```html
<p class="powered-by">
  Powered by <a href="https://www.mmamarketingpro.com" target="_blank" rel="noopener">MMA Marketing Pro</a>
</p>
```

Never drop, replace, or rebrand this. If it's missing on any page, `/seo-audit` will flag it.

## Sitemap Update

After building, add all 26 new URLs to `sitemap.xml`. Location pages get `changefreq: monthly, priority: 0.7`. Glossary pages get `changefreq: monthly, priority: 0.6`. Hub pages get `priority: 0.8`.

## Post-Build Checklist

1. [ ] All 26 pages exist at the correct paths
2. [ ] Each page uses the existing `styles.css` (no inline styles, no duplicate CSS)
3. [ ] Each page uses the lead modal with correct default program
4. [ ] Each page has `<link rel="canonical">`, `<meta property="og:*">`, `<meta name="twitter:*">`, favicon, viewport meta with `viewport-fit=cover`
5. [ ] Each page has appropriate JSON-LD schema
6. [ ] Each page has "Powered by MMA Marketing Pro" footer line with `target="_blank" rel="noopener"`
7. [ ] Each page contains 5+ unique-content elements (not a variable swap)
8. [ ] Primary nav updated on all existing + new pages with "Locations" link
9. [ ] `sitemap.xml` updated with all 26 new URLs
10. [ ] Run `/seo-audit` on the `sites/believe-jiu-jitsu/` folder — it should pass
11. [ ] Local preview via `cd sites && python3 -m http.server 8080` — click through all 26 pages
12. [ ] Commit, push to GitHub — Cloudflare auto-deploys
13. [ ] Submit updated sitemap to Google Search Console
14. [ ] Log to `sites/build-log.md` — "Phase 1 shipped, 26 pages added"

## Target Ship Date

_______________ (user fills in)

## Success Criteria (30 days post-ship)

- All 26 pages indexed in Google Search Console
- At least 3 pages ranking in top 20 for their primary keyword
- First organic lead-form submit attributed to a programmatic page

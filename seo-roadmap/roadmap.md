# Believe Jiu Jitsu — 6-Month Local SEO Roadmap

> **Status:** Plan only. No pages are built yet. Each phase has a paste-to-execute prompt you can run when you're ready to ship that chunk.

## Executive Summary

| Field | Value |
|---|---|
| Business | Believe Jiu Jitsu (Brazilian Jiu-Jitsu academy — Gi + No-Gi) |
| Primary city | **Summerville, SC 29486** — inside Charleston Family Fitness |
| Service area | Dorchester + Berkeley counties, Charleston metro west side |
| Core services | Adults BJJ, Kids BJJ (5-7 + 8-13), No-Gi, Homeschool, Open Mat |
| Head instructor | Professor Randy Gonzales — AOJ Black Belt (Prof. Danny Stolfi lineage) |
| **Pages to build over 6 months** | **~164** (split into 6 phased sprints, ~25–30 per month) |
| Playbook mix | Locations (heavy) · Personas (heavy) · Glossary (heavy) · Curation (medium) · Comparisons (medium) |

## Why This Plan Works for Believe Jiu Jitsu

- **You have a fresh domain + a real AOJ credential** — the credential is rare in the Summerville area and should anchor E-E-A-T on every page.
- **Cane Bay + Nexton are fast-growing planned communities** with tons of young families — your neighborhood pages for these areas will convert well even on modest traffic.
- **Kids BJJ is the highest commercial intent** in your niche — every "Kids Jiu-Jitsu in {neighborhood}" page has strong lead potential.
- **No direct BJJ competitor in Summerville proper** based on current scraping — you can own the "best BJJ gym Summerville" type queries quickly with good content.

---

## Keyword Matrix

| Pattern | Count | Example |
|---|---|---|
| `{service} in {neighborhood}` | 60 (6 services × 10 neighborhoods) | "Kids Jiu-Jitsu in Cane Bay" |
| `{service} for {persona}` | 24 | "Brazilian Jiu-Jitsu for Adults Over 40" |
| Neighborhood hub pages | 10 | "Martial Arts in Cane Bay, SC" |
| `best {thing} in {city}` / curation | 8 | "Best Kids Martial Arts in Summerville SC" |
| `what is {term}` / glossary | 20 | "What Is No-Gi Jiu-Jitsu?" |
| `{us} vs {comp}` comparisons | 8 | "BJJ vs Wrestling for Kids" |
| Examples / tutorials | 10 | "Basic BJJ Positions Every Beginner Should Know" |
| Pricing / offer pages | 6 | "BJJ Membership Pricing in Summerville SC" |
| Parent/Guardian guides | 8 | "How to Choose a Kids Martial Arts Gym in Summerville" |
| Cluster refreshers (Phase 6) | ~10 | (optimize existing Phase 1-2 pages) |
| **Total (6 months)** | **~164** | |

*Counts are targets, not strict caps. Adjust if local validation surfaces more or fewer real neighborhoods/personas.*

---

## Service × Neighborhood Grid (the Locations Core)

**Services (6 that get their own per-neighborhood page):**
1. Brazilian Jiu-Jitsu (general)
2. Kids Jiu-Jitsu (5-13 umbrella)
3. Adult Jiu-Jitsu
4. No-Gi Jiu-Jitsu
5. Homeschool Jiu-Jitsu
6. Self-Defense Classes

**Neighborhoods (10 tiered priorities):**

| Tier | Neighborhood | Why |
|---|---|---|
| 1 | Cane Bay (29486) | Adjacent to gym, young-family heavy — **highest ROI** |
| 1 | Nexton (29486) | Large master-planned community, rapid growth |
| 1 | Summerville Downtown (29483) | Core city SEO |
| 1 | Sangaree (29486) | Right next door, easy local intent |
| 2 | Knightsville (29483) | Summerville-adjacent suburb |
| 2 | Ladson (29456) | Short drive, family neighborhoods |
| 2 | Goose Creek (29445) | Berkeley county, strong base |
| 2 | Moncks Corner (29461) | Broader Berkeley market |
| 3 | Hanahan (29410) | Edge of service area |
| 3 | North Charleston (29406) | Larger metro, stretch goal |

→ **60 canonical location pages**, one per service × neighborhood combination.

**Neighborhood hubs (10):** one parent page per neighborhood linking to its service pages (e.g., `/locations/cane-bay/` links out to BJJ, Kids BJJ, No-Gi, etc.).

---

## Persona Matrix

| Service | × Persona | Target URL |
|---|---|---|
| Brazilian Jiu-Jitsu | Complete Beginners | `/programs/bjj-for-beginners/` |
| Brazilian Jiu-Jitsu | Adults Over 30 | `/programs/bjj-for-adults-over-30/` |
| Brazilian Jiu-Jitsu | Adults Over 40 | `/programs/bjj-for-adults-over-40/` |
| Brazilian Jiu-Jitsu | Women | `/programs/bjj-for-women/` |
| Brazilian Jiu-Jitsu | Military & First Responders | `/programs/bjj-for-military-first-responders/` |
| Brazilian Jiu-Jitsu | Weight Loss / Fitness | `/programs/bjj-for-fitness-and-weight-loss/` |
| Kids Jiu-Jitsu | Shy / Introverted Kids | `/programs/kids-bjj-for-shy-kids/` |
| Kids Jiu-Jitsu | Kids with ADHD | `/programs/kids-bjj-for-kids-with-adhd/` |
| Kids Jiu-Jitsu | Homeschool Kids | `/programs/kids-bjj-for-homeschoolers/` |
| Kids Jiu-Jitsu | Bullied Kids | `/programs/kids-bjj-for-bullied-kids/` |
| Kids Jiu-Jitsu | Kids Who Hate Sports | `/programs/kids-bjj-for-kids-who-hate-sports/` |
| Teens Jiu-Jitsu | Teenage Girls | `/programs/bjj-for-teenage-girls/` |
| Adult BJJ | Busy Professionals | `/programs/bjj-for-busy-professionals/` |
| Self-Defense | Women's Self-Defense | `/programs/self-defense-for-women/` |
| … (extends to 24 total) | | |

---

## URL Structure

```
/                                    # Home (exists)
/about.html                          # About (exists)
/class-schedule.html                 # Schedule (exists)
/contact.html                        # Contact (exists)
/locations/                          # Locations hub (Phase 1)
/locations/cane-bay/                 # Neighborhood hub
/locations/cane-bay/kids-jiu-jitsu/  # Service × neighborhood
/locations/cane-bay/brazilian-jiu-jitsu/
/programs/bjj-for-beginners/         # Persona pages
/learn/                              # Glossary hub (Phase 4)
/learn/what-is-no-gi-jiu-jitsu/
/compare/                            # Comparison hub (Phase 3)
/compare/bjj-vs-wrestling/
/guides/                             # Curation hub (Phase 3)
/guides/best-kids-martial-arts-summerville/
```

**All URLs:** lowercase, hyphenated, no trailing-slash inconsistency. On Cloudflare Pages with static HTML, each page is a file inside a folder + `index.html` (e.g., `locations/cane-bay/index.html`).

---

## Phase Table (the 6-month ship plan)

| Phase | Month | Sprint Theme | Pages | Keyword Tier |
|---|---|---|---|---|
| **1** | Month 1 | Foundation: Tier-1 neighborhoods + core glossary | **26** (20 loc + 6 glossary) | Medium (local, quick wins) |
| **2** | Month 2 | Persona expansion + Tier-2 neighborhoods | **26** (14 persona + 12 loc) | Medium |
| **3** | Month 3 | Authority & curation (best-of) + comparisons | **27** (8 curation + 8 comparisons + 11 hub pages) | High intent |
| **4** | Month 4 | Glossary depth + tutorials + Tier-3 neighborhoods | **25** (15 glossary/examples + 10 loc) | Long-tail |
| **5** | Month 5 | Pricing/offers + parent guides + edge geographies | **30** (6 pricing + 8 parent guides + 10 persona + 6 edge loc) | Mixed |
| **6** | Month 6 | Fill gaps + refresh Phase 1 pages + optimize | **30** (20 new + 10 refresh) | Mixed |
| **Total** | | | **~164** | |

---

## Internal Linking Architecture (Hub & Spoke)

```
Home (hub)
  ├─→ /locations/                    ← Locations master hub
  │     ├─→ /locations/cane-bay/
  │     │     ├─→ /locations/cane-bay/kids-jiu-jitsu/
  │     │     ├─→ /locations/cane-bay/brazilian-jiu-jitsu/
  │     │     └─→ /locations/cane-bay/no-gi-jiu-jitsu/
  │     └─→ /locations/nexton/ …
  │
  ├─→ /programs/                     ← Persona hub (uses nav "Programs" label)
  │     ├─→ /programs/bjj-for-beginners/
  │     ├─→ /programs/bjj-for-women/
  │     └─→ /programs/kids-bjj-for-homeschoolers/ …
  │
  ├─→ /learn/                        ← Glossary hub
  │     ├─→ /learn/what-is-no-gi-jiu-jitsu/
  │     └─→ /learn/what-is-a-bjj-belt-rank/ …
  │
  ├─→ /compare/                      ← Comparisons hub
  │     └─→ /compare/bjj-vs-wrestling/ …
  │
  └─→ /guides/                       ← Curation hub
        └─→ /guides/best-kids-martial-arts-summerville/ …
```

**Contextual link rules for every new page:**
1. Link to **2 sibling pages** (e.g., a neighborhood service page links to 2 other service pages in the same neighborhood)
2. Link to **1 parent hub**
3. Link to **1 relevant glossary page** (if applicable)
4. Link to the **booking modal** via a CTA at top, middle, and bottom

Every hub page should list all its spokes. Every spoke page should link back to its hub.

---

## Schema Strategy Per Page Type

| Page type | JSON-LD to include |
|---|---|
| Neighborhood × service page | `LocalBusiness` (scoped by `areaServed` City), `Service`, `BreadcrumbList`, `FAQPage` if a FAQ is present |
| Neighborhood hub | `Place`, `BreadcrumbList`, `ItemList` of services |
| Persona page | `Service`, `BreadcrumbList`, `FAQPage` |
| Glossary page | `DefinedTerm`, `BreadcrumbList`, `FAQPage`, `Article` |
| Comparison page | `Article`, `BreadcrumbList`, `FAQPage` |
| Curation page ("best of") | `ItemList`, `BreadcrumbList`, `Article` |

The existing `LocalBusiness` on the homepage provides a central `@id` — all subpages should reference it via `"provider": { "@id": "https://believejiujitsu.com/#org" }`.

---

## Content Uniqueness Rules (avoid thin-content penalty)

Every page must include at minimum **5 of these 8 page-specific elements** so it is NOT a variable swap:

1. **Neighborhood intro paragraph** — specific landmarks, drive time, notable subdivisions, what the families in this neighborhood look like
2. **"Why train at Believe" section** rewritten with a neighborhood-specific angle (e.g., commute, parking near Cane Bay, school-run timing for families)
3. **Relevant class times** pulled from the real schedule — highlight the 2-3 classes most relevant to this audience
4. **One pulled testimonial** that mentions kids, women, beginners, or a trait matching the page intent (rotate across the 6 reviews already scraped)
5. **One locally-relevant FAQ** (e.g., "How long is the drive from Nexton to Believe Jiu Jitsu?")
6. **Specific visual** — embedded map, neighborhood photo, or a photo of the relevant class (use stock/local data-local pattern for now)
7. **Cross-links to 2 sibling pages** and **1 glossary page**
8. **Locally specific CTA copy** (e.g., "Cane Bay families — your first class is free")

If a page has fewer than 5, it gets flagged and revised before publish.

---

## Success Metrics Per Phase

| Phase | 30-day goal | 90-day goal |
|---|---|---|
| 1 | All 26 pages indexed in GSC; 3+ ranking top 20 for "{neighborhood} BJJ" queries | 10+ top-10 rankings; 1+ page/day in organic traffic |
| 2 | 50+ pages total indexed; 5+ ranking top 10 | 15+ lead-form submits attributed to new pages |
| 3 | Curation pages ranking top 10 for "best BJJ Summerville" terms | 25+ monthly lead-form submits from programmatic pages |
| 4 | Glossary cluster pulling top-of-funnel traffic | 100+ monthly organic sessions from glossary cluster |
| 5 | Pricing page ranking for "BJJ cost Summerville" | 40+ monthly leads attributed to programmatic |
| 6 | Full 164 pages live, Phase 1 pages refreshed with new testimonials/photos | Established as top 3 result for "BJJ Summerville SC" |

---

## Assumptions to Validate

Flag these to the business owner before shipping Phase 1:

1. **Neighborhoods:** Cane Bay, Nexton, Sangaree, Summerville Downtown, Knightsville, Ladson, Goose Creek, Moncks Corner, Hanahan, North Charleston — are any clearly off-target? (e.g., North Charleston may be too far for a typical student)
2. **Personas:** "BJJ for Homeschoolers" assumes the existing homeschool class is a real commercial target — confirm. Same for "BJJ for Military & First Responders" (is Joint Base Charleston nearby a real pipeline?).
3. **Local landmarks per neighborhood** — need at least one specific street, park, subdivision, or school per neighborhood to avoid generic-swap feel. Owner may have better local knowledge.
4. **Competitors:** which other martial arts gyms are in Summerville / Cane Bay — we don't currently list them, but knowing the top 2-3 helps with the curation pages ("Best BJJ Gym in Summerville SC").
5. **Pricing disclosure:** if you don't want prices on programmatic pages, swap the pricing pages in Phase 5 for "How much does BJJ cost in Summerville" style pages that explain the factors without exact figures.

---

## Agency Attribution (non-negotiable)

Every page produced in every phase must include this line in the footer:

```html
<p class="powered-by">
  Powered by <a href="https://www.mmamarketingpro.com" target="_blank" rel="noopener">MMA Marketing Pro</a>
</p>
```

This is verified in Step 4.5 (`/seo-audit`) and must be present on every new programmatic page shipped in any phase.

---

## How To Ship Each Phase

When you're ready to ship a phase:

1. Open `sites/believe-jiu-jitsu/seo-roadmap/phase-N-prompt.md`
2. Paste the entire file into a fresh Claude Code session in this repo
3. Claude will build the 25–30 pages for that phase using the existing `styles.css`, `scripts.js`, `brand-kit.json`, and lead modal
4. Review, run `/seo-audit` on the new pages, update `sitemap.xml`, commit, push to GitHub, deploy
5. Measure after 30/60/90 days, refresh in Phase 6 if needed

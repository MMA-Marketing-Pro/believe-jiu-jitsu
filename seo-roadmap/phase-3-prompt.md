# Phase 3 — Authority: Curation + Comparisons + Hub Content (27 pages)

> Ship Month 3. Paste into a fresh Claude Code session when ready.

## Prerequisites

Phases 1 and 2 must be live. At least 40 of the 52 prior pages should be indexed before starting Phase 3 to avoid diluting crawl budget.

**Read:** all skill files (`site-redesign`, `taste-skill`, `performance-athletic-skill`, `seo-audit`, `programmatic-seo`), plus `sites/believe-jiu-jitsu/seo-roadmap/keywords.json` and `roadmap.md`.

## Phase 3 Objective

Authority layer — the content that converts visitors from Phases 1-2 and starts ranking for high-intent "best X" and "X vs Y" queries.

- **8 curation pages** — "best of" local guides
- **8 comparison pages** — "BJJ vs …" content
- **11 cross-link / hub enrichment pages** — deeper guides, parent info, coach attribution

**Total:** 27 pages.

## Page List

### Curation Pages (8) — `/guides/...`

| # | Path | Primary keyword |
|---|---|---|
| 1 | `/guides/index.html` | Guides hub |
| 2 | `/guides/best-bjj-gym-summerville.html` | best bjj gym summerville sc |
| 3 | `/guides/best-kids-martial-arts-summerville.html` | best kids martial arts summerville |
| 4 | `/guides/best-martial-arts-kids-cane-bay.html` | best kids martial arts cane bay |
| 5 | `/guides/best-self-defense-summerville.html` | best self defense classes summerville |
| 6 | `/guides/best-womens-bjj-summerville.html` | best womens bjj summerville |
| 7 | `/guides/best-after-school-martial-arts-summerville.html` | after school martial arts summerville |
| 8 | `/guides/best-homeschool-pe-summerville.html` | homeschool pe summerville sc |

### Comparison Pages (8) — `/compare/...`

| # | Path | Primary keyword |
|---|---|---|
| 9 | `/compare/index.html` | Comparisons hub |
| 10 | `/compare/bjj-vs-mma.html` | bjj vs mma |
| 11 | `/compare/bjj-vs-wrestling.html` | bjj vs wrestling for kids |
| 12 | `/compare/bjj-vs-judo.html` | bjj vs judo |
| 13 | `/compare/bjj-vs-karate-for-kids.html` | bjj vs karate for kids |
| 14 | `/compare/gi-vs-no-gi.html` | gi vs no gi jiu jitsu |
| 15 | `/compare/bjj-vs-boxing.html` | bjj vs boxing |
| 16 | `/compare/bjj-vs-taekwondo-for-kids.html` | bjj vs taekwondo for kids |

### Authority / Hub Enrichment Pages (11) — scattered

| # | Path | Purpose |
|---|---|---|
| 17 | `/instructors/randy-gonzales.html` | Full coach profile page — anchors E-E-A-T |
| 18 | `/instructors/index.html` | Instructors hub |
| 19 | `/about/aoj-lineage.html` | Why AOJ lineage matters — builds credibility |
| 20 | `/parents/first-class-what-to-expect.html` | Parent's guide to the first class |
| 21 | `/parents/choosing-a-kids-martial-arts-gym.html` | Evaluative content for parents |
| 22 | `/parents/bjj-belt-ranks-for-kids-explained.html` | Kids belt system guide |
| 23 | `/adults/starting-bjj-as-an-adult.html` | Adult beginner guide |
| 24 | `/adults/bjj-injury-prevention.html` | Injury prevention — uses Randy's science background |
| 25 | `/adults/what-to-eat-before-bjj-training.html` | Nutrition guide |
| 26 | `/faq.html` | Comprehensive site-wide FAQ |
| 27 | `/guides/how-to-tie-a-bjj-belt.html` | Tutorial — snippet magnet |

## Curation Page Template

**URL:** `/guides/best-{thing}-{location}.html`
**Title:** `Best {Thing} in {Location} ({current year})` — use dynamic year JS helper to keep titles fresh
**Meta:** Lead with "we reviewed X gyms in {city}, here's the best one for {audience}". 150-160 chars.

**Required sections:**
1. Breadcrumb
2. H1
3. TL;DR box — "If you need {outcome}, Believe Jiu Jitsu is our top pick in {city} because {3 concrete reasons}"
4. Evaluation criteria — what makes a great {thing}? 4-5 criteria
5. The pick(s):
   - Include Believe Jiu Jitsu first, scored against your criteria with real details (AOJ lineage, class times, facility inside CFF)
   - Include 2-3 other local options **scored honestly** — be fair, this builds trust. Examples in Summerville might be Gracie Barra Charleston, another Charleston-area school. Flag these for the owner to validate.
6. Honorable mentions
7. "How to choose for your specific situation" — link to personas pages from Phase 2
8. FAQ (3 Qs)
9. Cross-links to location pages + related guides
10. CTA — book a trial

**Schema:** `ItemList` + `BreadcrumbList` + `Article` (author = Professor Randy).

## Comparison Page Template

**URL:** `/compare/{style-a}-vs-{style-b}.html`
**Title:** `{A} vs {B}: Which Is Better for {Audience}? | Believe Jiu Jitsu`
**Meta:** Direct-answer first — "For {audience}, {winner} is usually better because {reason}". 150-160 chars.

**Required sections:**
1. Breadcrumb
2. H1
3. 1-paragraph direct answer (featured-snippet target)
4. Side-by-side comparison table (10 rows: skills taught, injury risk, cost, ego check, competition path, gi/no-gi, age range, time to progress, community, real-world effectiveness)
5. When to choose A vs B — case-specific
6. What we teach at Believe (why our blend works)
7. Local tie-in: "Start {winner} in Summerville, SC"
8. FAQ (3 Qs)
9. Cross-links to relevant persona pages
10. CTA

**Schema:** `Article` + `BreadcrumbList` + `FAQPage`.

## Instructor Profile — `randy-gonzales.html`

This is an E-E-A-T anchor page — every other page links to it for credibility.

**Sections:**
1. Full bio (expand the existing homepage version)
2. Credentials timeline: purple belt → brown → black, including year, who promoted, relevant competitions
3. Teaching philosophy (pulled from scraped content + elaborated)
4. Science background — how his Master's in Science informs BJJ instruction
5. Classes Randy personally teaches (from schedule)
6. Testimonials specifically about Randy (5 of the 6 existing reviews mention him by name)
7. Photo gallery (placeholders using data-local convention)
8. "Train with Randy" CTA
9. Breadcrumb: Home / Instructors / Randy Gonzales

**Schema:** `Person` with full credentials, `hasCredential`, `alumniOf`, `knowsAbout`, and `worksFor` = LocalBusiness @id.

## Parent Pages Template

These are for parents evaluating kids martial arts — high commercial intent but informational tone.

**Example — "First Class: What to Expect" page:**
1. Pre-class checklist
2. What to wear (link to glossary)
3. What happens in the first 15 minutes
4. What happens in minute 15-45
5. How to debrief with your kid afterward
6. Red flags at other gyms vs what we do differently
7. Link to book the free trial

## Required Head Block

Same pattern as Phases 1 and 2 — canonical, OG, Twitter, favicon, viewport, JSON-LD.

## Internal Linking — This Phase Is Where It Gets Dense

Every curation page links to:
- 3-5 related location pages (from Phases 1 + 2)
- 2-3 persona pages
- 2 glossary pages
- 1 instructor page
- Booking modal

Every comparison page links to:
- 2 persona pages
- 1-2 glossary pages
- 1 location page
- Booking modal

Every existing Phase 1-2 page gets **at least one new inbound link** from a Phase 3 page (update the older pages to add contextual links where natural).

## Nav Update

Add "Guides" to primary nav (between "About" and "Programs"). Add "Instructors" to the footer's "Academy" column.

## Agency Attribution

Required on every new page:
```html
<p class="powered-by">
  Powered by <a href="https://www.mmamarketingpro.com" target="_blank" rel="noopener">MMA Marketing Pro</a>
</p>
```

## Validation Before Publish

- [ ] Curation pages list at least 1 honest competitor comparison (reach out to owner for local competitor names)
- [ ] Comparison pages have a direct-answer first paragraph (featured-snippet optimized)
- [ ] Instructor page cites verifiable AOJ / Danny Stolfi connection
- [ ] Every page passes unique-content checklist (5 of 8 elements)
- [ ] Sitemap updated with all 27 new URLs
- [ ] `/seo-audit` passes

## Target Ship Date

_______________

## Success Criteria

- Curation pages ranking top 10 for "best BJJ Summerville" within 60 days
- Comparison pages targeting featured snippets — monitor SERP features for each
- Phase 1-2 pages showing internal-link growth in GSC
- Instructor profile page is the most-linked page on the site (internal links count)

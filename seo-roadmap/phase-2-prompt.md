# Phase 2 — Persona Expansion + Tier-2 Neighborhoods (26 pages)

> Ship Month 2. Paste into a fresh Claude Code session when ready.

## Prerequisites

Phase 1 must be live and indexed. Before starting, verify in GSC that at least 15 of the Phase 1 pages are indexed.

**Read:** same skill files as Phase 1 (`site-redesign`, `taste-skill`, `performance-athletic-skill`, `seo-audit`, `programmatic-seo`), plus `sites/believe-jiu-jitsu/seo-roadmap/keywords.json` and `roadmap.md`.

## Phase 2 Objective

Expand in two directions:
- **Personas:** 14 pages targeting specific audiences (adults over 40, women, kids with ADHD, etc.)
- **Tier-2 neighborhoods:** 12 location × service pages for Knightsville, Ladson, Goose Creek

**Total:** 26 pages.

## Page List

### Persona Pages (14) — `/programs/...`

Build the `/programs/` master hub first (1 page), then 13 individual persona pages.

| # | Path | Target keyword | H1 |
|---|---|---|---|
| 1 | `/programs/index.html` | Programs hub | Our Programs |
| 2 | `/programs/bjj-for-beginners.html` | brazilian jiu-jitsu for beginners | BJJ for Complete Beginners |
| 3 | `/programs/bjj-for-adults-over-30.html` | bjj for adults over 30 | Starting BJJ After 30 |
| 4 | `/programs/bjj-for-adults-over-40.html` | bjj for adults over 40 | Starting BJJ After 40 |
| 5 | `/programs/bjj-for-women.html` | bjj for women summerville | BJJ for Women |
| 6 | `/programs/bjj-for-military-first-responders.html` | bjj military first responders | BJJ for Military & First Responders |
| 7 | `/programs/bjj-for-fitness-and-weight-loss.html` | bjj for weight loss | BJJ for Fitness &amp; Weight Loss |
| 8 | `/programs/kids-bjj-for-shy-kids.html` | martial arts for shy kids | Kids BJJ for Shy or Introverted Kids |
| 9 | `/programs/kids-bjj-for-kids-with-adhd.html` | martial arts for kids with adhd | Kids BJJ for Children with ADHD |
| 10 | `/programs/kids-bjj-for-homeschoolers.html` | homeschool pe martial arts | Kids BJJ for Homeschool Families |
| 11 | `/programs/kids-bjj-for-bullied-kids.html` | martial arts to stop bullying | Kids BJJ for Kids Dealing with Bullying |
| 12 | `/programs/bjj-for-teenage-girls.html` | bjj for teenage girls | BJJ for Teenage Girls |
| 13 | `/programs/bjj-for-busy-professionals.html` | bjj for busy professionals | BJJ for Busy Professionals |
| 14 | `/programs/self-defense-for-women.html` | self defense classes for women summerville | Self-Defense for Women |

### Tier-2 Location Pages (12) — `/locations/...`

Build 3 neighborhood hubs + 3 service pages each (4 × 3 = 12, but 3 hubs + 9 service pages = 12).

| # | Path | Primary keyword |
|---|---|---|
| 15 | `/locations/knightsville/index.html` | martial arts knightsville sc |
| 16 | `/locations/knightsville/brazilian-jiu-jitsu.html` | bjj knightsville sc |
| 17 | `/locations/knightsville/kids-jiu-jitsu.html` | kids jiu jitsu knightsville sc |
| 18 | `/locations/knightsville/no-gi-jiu-jitsu.html` | no gi jiu jitsu knightsville sc |
| 19 | `/locations/ladson/index.html` | martial arts ladson sc |
| 20 | `/locations/ladson/brazilian-jiu-jitsu.html` | bjj ladson sc |
| 21 | `/locations/ladson/kids-jiu-jitsu.html` | kids jiu jitsu ladson sc |
| 22 | `/locations/ladson/no-gi-jiu-jitsu.html` | no gi jiu jitsu ladson sc |
| 23 | `/locations/goose-creek/index.html` | martial arts goose creek sc |
| 24 | `/locations/goose-creek/brazilian-jiu-jitsu.html` | bjj goose creek sc |
| 25 | `/locations/goose-creek/kids-jiu-jitsu.html` | kids jiu jitsu goose creek sc |
| 26 | `/locations/goose-creek/no-gi-jiu-jitsu.html` | no gi jiu jitsu goose creek sc |

## Persona Page Template

**Title pattern:** `{Headline} in Summerville SC | Believe Jiu Jitsu`
**Meta pattern:** Lead with the audience + specific benefit + local qualifier. 150-160 chars.
**Required sections:**
1. Breadcrumb: Home / Programs / {Persona Label}
2. Hero H1 + subheadline speaking to the audience directly
3. "The problem this persona faces" paragraph (2-3 sentences — empathy first)
4. "How BJJ addresses it" — 3-4 specific benefits tied to the persona's pain points
5. What a typical first month looks like for this audience
6. Relevant classes (pulled from schedule)
7. 1 rotated testimonial that matches the persona
8. FAQ (3 Qs specific to this audience's concerns)
9. Cross-link to 2 other relevant personas + 1 relevant location page + 1 glossary
10. CTA — lead modal with program pre-select matched to the audience

**Schema:** `Service` + `BreadcrumbList` + `FAQPage` + `Article` (author = Professor Randy).

## Tier-2 Location Page Template

Same as Phase 1 Pattern A + B. Specific neighborhood intros — for these Tier-2 areas, emphasize drive time from each to the gym (Knightsville ~5 min, Ladson ~12 min, Goose Creek ~15 min).

## Required Head Block (every new page)

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="canonical" href="https://believejiujitsu.com/{this-page-path}">
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' fill='%230A0A0A'/><rect x='11' y='11' width='10' height='10' fill='%2337CA37'/></svg>">
<meta property="og:type" content="website">
<meta property="og:url" content="https://believejiujitsu.com/{this-page-path}">
<meta property="og:site_name" content="Believe Jiu Jitsu">
<meta property="og:title" content="{page-specific title}">
<meta property="og:description" content="{page-specific description}">
<meta property="og:image" content="https://picsum.photos/seed/believe-bjj-og/1200/630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{title}">
<meta name="twitter:description" content="{desc}">
<meta name="twitter:image" content="https://picsum.photos/seed/believe-bjj-og/1200/630">
```

## Nav Update

Add "Programs" link to primary nav between "About" and "Schedule" on ALL existing pages. The "Programs" nav item links to `/programs/`. Update both desktop nav and mobile menu.

## Unique-Content Checklist Per Page

Every persona page must cite **at least one specific barrier, fear, or belief** that audience holds, then counter it with a specific feature of training at Believe. Examples:
- "BJJ for Adults Over 40" — address fear of injury, slow recovery, ego bruising. Counter: Professor Randy's anatomy/physiology background means every technique is taught with joint safety in mind.
- "BJJ for Women" — address discomfort training with men. Counter: explicit inclusion note from testimonials (Kyra-Nicole's review).
- "BJJ for Shy Kids" — address anxiety, fear of "roughhousing". Counter: structured Little Kids Program focused on confidence, not sparring.

## Internal Link Requirements

Each persona page links to:
- `/programs/` hub
- 2 other persona pages in the same family (e.g., "BJJ for Women" → "BJJ for Beginners" + "Self-Defense for Women")
- 1 relevant location page
- 1 relevant glossary page
- `/contact.html` (for the "questions?" CTA)
- Main booking flow via modal

## Agency Attribution

Required in every footer:
```html
<p class="powered-by">
  Powered by <a href="https://www.mmamarketingpro.com" target="_blank" rel="noopener">MMA Marketing Pro</a>
</p>
```

## Sitemap Update

Add all 26 new URLs to `sitemap.xml` with `changefreq: monthly, priority: 0.7`. Programs hub gets `0.8`.

## Post-Build Checklist

1. [ ] 26 new pages built
2. [ ] "Programs" added to main nav on every page (old + new)
3. [ ] Every persona page passes the "unique barrier-and-counter" check above
4. [ ] Every location page passes the 5-of-8 unique-content check
5. [ ] All head meta, canonical, schema, favicon present
6. [ ] "Powered by MMA Marketing Pro" attribution on every new page
7. [ ] `sitemap.xml` updated
8. [ ] `/seo-audit` passes on the whole folder
9. [ ] Commit, push, verify Cloudflare deploy
10. [ ] Log to `sites/build-log.md`

## Target Ship Date

_______________

## Success Criteria

- 60%+ of Phase 2 pages indexed within 30 days
- Phase 1 neighborhood hubs showing internal link traffic from Phase 2 persona pages (GSC internal-links report)
- At least 1 persona page ranking top 20 for its primary keyword within 60 days

# Phase 4 — Long-Tail Glossary + Tutorials + Tier-3 Neighborhoods (25 pages)

> Ship Month 4.

## Prerequisites
Phases 1-3 live. Domain authority should be growing by now — Phase 4 is where long-tail traffic compounds.

**Read:** skill files + `keywords.json` + `roadmap.md`.

## Objective
Saturate the `/learn/` cluster and extend the service area to Tier-3 neighborhoods.

- **15 glossary / tutorial pages**
- **10 Tier-3 location pages** (Moncks Corner, Hanahan, North Charleston)

**Total:** 25 pages.

## Page List

### Glossary Expansion (15)

| # | Path | Keyword target |
|---|---|---|
| 1 | `/learn/what-is-open-mat.html` | what is open mat in bjj |
| 2 | `/learn/what-is-a-bjj-belt-rank.html` | bjj belt ranks explained |
| 3 | `/learn/what-is-aoj.html` | what is aoj jiu jitsu |
| 4 | `/learn/what-is-a-submission.html` | what is a submission in bjj |
| 5 | `/learn/what-is-a-guard-in-bjj.html` | bjj guard positions |
| 6 | `/learn/what-is-a-mount-in-bjj.html` | mount position bjj |
| 7 | `/learn/what-is-side-control.html` | side control bjj |
| 8 | `/learn/what-is-a-rash-guard.html` | what is a rash guard |
| 9 | `/learn/how-long-to-earn-blue-belt.html` | how long to blue belt bjj |
| 10 | `/learn/how-often-should-i-train-bjj.html` | how often should i train bjj |
| 11 | `/learn/how-to-prepare-for-first-bjj-class.html` | preparing for first bjj class |
| 12 | `/learn/what-is-ibjjf.html` | what is ibjjf |
| 13 | `/learn/is-bjj-safe-for-kids.html` | is bjj safe for kids |
| 14 | `/learn/basic-bjj-positions-beginners.html` | basic bjj positions for beginners |
| 15 | `/learn/how-to-tie-a-gi-belt.html` | how to tie a bjj belt |

### Tier-3 Locations (10)

| # | Path |
|---|---|
| 16 | `/locations/moncks-corner/index.html` |
| 17 | `/locations/moncks-corner/brazilian-jiu-jitsu.html` |
| 18 | `/locations/moncks-corner/kids-jiu-jitsu.html` |
| 19 | `/locations/moncks-corner/no-gi-jiu-jitsu.html` |
| 20 | `/locations/hanahan/index.html` |
| 21 | `/locations/hanahan/brazilian-jiu-jitsu.html` |
| 22 | `/locations/hanahan/kids-jiu-jitsu.html` |
| 23 | `/locations/north-charleston/index.html` |
| 24 | `/locations/north-charleston/brazilian-jiu-jitsu.html` |
| 25 | `/locations/north-charleston/kids-jiu-jitsu.html` |

## Glossary Page Template (reaffirm from Phase 1)

**Target:** featured-snippet optimization on every page.

**Required format:**
1. Title + meta as usual
2. Breadcrumb: Home / Learn / {Term}
3. **Direct-answer paragraph under H1** — 40-60 words, answers the exact question in plain language. This is the snippet target.
4. Detailed explanation (3-5 subsections with H2s)
5. For tutorial pages (how-to): numbered steps, each step with its own H3
6. Visual/diagram placeholder (use picsum with data-local for real photo swap later)
7. FAQ with 3 related questions (auto-suggest from "People Also Ask")
8. "Train this at Believe Jiu Jitsu" callout at the bottom — link to schedule + booking
9. Cross-links to 2-3 other glossary terms + 1 location page
10. CTA

**Schema:** `DefinedTerm` or `HowTo` (for tutorials) + `FAQPage` + `BreadcrumbList` + `Article` (author = Professor Randy).

## Tutorial Pages — Special Template (for "basic BJJ positions" + "how to tie belt")

These use **HowTo** schema. Each step gets:
- A clear imperative title (e.g., "Step 1: Form a loop around your waist")
- 2-3 sentence body
- A photo/diagram placeholder

Google renders HowTo steps as a rich result — this is worth extra care.

## Tier-3 Location Pages

Follow Phase 1 Pattern A + B. These are further from the gym — the neighborhood intro must address "is the drive worth it?" honestly. Moncks Corner = ~20 min, Hanahan = ~20 min, North Charleston = ~25 min. Frame the drive as reasonable for a 2-3x/week commitment.

## Required Head Block

Same pattern.

## Internal Linking

Glossary pages should be linked densely:
- Every glossary page links to 3 other glossary pages
- Every service page built in Phases 1-2 now has a "Learn more" section linking to the matching glossary (go back and update older pages)
- Every neighborhood hub links to 1-2 most-relevant glossary pages

## Agency Attribution

Required on every new page.

## Post-Build

1. [ ] 25 pages built
2. [ ] Each glossary page has a featured-snippet-optimized direct-answer paragraph
3. [ ] Tutorial pages use HowTo schema
4. [ ] Older Phase 1-2 pages updated with "Learn more" links to new glossary entries
5. [ ] Sitemap updated
6. [ ] `/seo-audit` passes
7. [ ] Commit, push, deploy
8. [ ] Log to build-log.md

## Target Ship Date

_______________

## Success Criteria

- At least 3 glossary pages capturing a featured snippet within 90 days
- Long-tail organic traffic growing month-over-month
- Bounce rate on glossary pages < 70% (Google Analytics)
- Tier-3 location pages getting impressions in GSC for their primary keyword within 45 days

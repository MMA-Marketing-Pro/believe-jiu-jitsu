# Believe Jiu Jitsu — Site Analysis

## Business
- **Name:** Believe Jiu Jitsu (Believe Brazilian Jiu-Jitsu)
- **Type:** BJJ academy — Gi & No-Gi
- **Location:** 117 N. Creek Dr. Unit B, Summerville, SC 29486 (inside Charleston Family Fitness)
- **Owners:** Professor Randy Gonzales (head instructor, AOJ black belt under Professor Danny Stolfi) + Coach Flavia (co-owner, his wife)
- **Phone:** 843-585-3465 · **Email:** Flavia@believejiujitsu.com

## Brand Vibe
Family-oriented but competitive. Professor Randy brings real AOJ credentials and an academic background (Master's in Science, anatomy/physiology). Testimonials emphasize community, welcoming women, kids engagement, competitive edge. Electric green accent (#37CA37) on black — modern athletic, not retro or prestige.

## Site Structure Found (6 pages)
1. **Home** — hero, free-trial flow, programs overview, uniform policy, location, testimonials
2. **About** — Professor Randy bio + philosophy, uniform policy repeated
3. **Class Schedule** — detailed Mon–Sat schedule
4. **Contact** — phone, email, address, contact form
5. **Privacy Policy** — legal
6. **Terms & Conditions** — legal

**Essential:** Home, About, Class Schedule, Contact, Booking (new)
**Required (legal):** Privacy Policy, Terms & Conditions

## Design Recommendation: `performance-athletic-skill`
Sportswear-brand energy with kinetic marquees and one electric accent — a perfect fit for a modern BJJ academy targeting kids + adults. Their existing brand is already electric green on black, which maps directly to the performance-athletic system. Avoided `cinematic-fight` (no pro-fighter roster to feature), `training-lab` (not a data/S&C story), and `championship-heritage` (academy is recent, not multi-decade lineage).

## Biggest Current Site Issues
- GoHighLevel template styling — generic hero, weak hierarchy, low design density
- Class schedule presented as plain-text blocks instead of a readable weekly grid
- Testimonials visually flat — no star rating styling, no card depth, no author photos
- No real photography from the academy (only stock)
- Mobile experience inherits template defaults — schedule becomes a wall of text
- Brand color is present as a CSS variable but isn't amplified into the design

## What We'll Build
- **6 pages** (matching the original 6) + **booking.html** funnel page = 7 HTML files
- Electric-green + deep-black performance-athletic system
- Full-weekly class schedule grid (responsive card layout on mobile)
- Pro-style instructor spotlight for Professor Randy
- Testimonial carousel with proper typography
- Lead modal on every CTA → booking page with GHL calendar placeholders per program

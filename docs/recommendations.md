# Outworx Marketing Site — Recommended Future Improvements

Status: suggestions only. None of the items below are implemented; each requires explicit approval before work begins. Pricing API / fetch / fallback logic is intentionally excluded from every item.

Severity legend — Priority: High / Medium / Low. Complexity: Low / Medium / High.

---

## 1. Conversion Improvements

### 1.1 Annual / Monthly billing toggle on Pricing
- **Location:** `src/pages/Pricing.tsx`, above the plan grid.
- **Purpose:** Surface a discounted annual price next to the monthly one.
- **User Benefit:** Lets cost-conscious buyers compare commitment options at a glance.
- **Business Benefit:** Annual upsell lifts ACV and reduces churn risk.
- **Priority:** High. **Complexity:** Medium.
- **Dependencies:** Pricing API must return both interval prices (out of scope for this task).
- **Suggested UI Placement:** Centered segmented control directly above the plan cards.
- **Expected Impact:** Industry-typical 10–20% shift toward annual on B2B SaaS.
- **Mock User Journey:** Visitor lands on /pricing → flips toggle to "Annual" → cards re-render with discounted price + "save 2 months" badge → clicks Get Started.

### 1.2 Sticky bottom CTA on long pages
- **Location:** Blog posts, About, API docs.
- **Purpose:** Capture intent at scroll depth.
- **User Benefit:** One-click action without scrolling back up.
- **Business Benefit:** Higher trial sign-up rate from content traffic.
- **Priority:** Medium. **Complexity:** Low.
- **Dependencies:** None.
- **Suggested UI Placement:** Slim glass bar appearing after 50% scroll, dismissible.
- **Expected Impact:** Typical +8–15% CTR from blog readers.
- **Mock User Journey:** Reader scrolls past midpoint of a post → bar fades in with "Try Outworx free" → clicks → /signup.

### 1.3 Exit-intent demo modal
- **Location:** Homepage and Pricing.
- **Purpose:** Recover abandoning visitors with a low-friction action (book a demo).
- **User Benefit:** Optional alternative to immediate sign-up.
- **Business Benefit:** Captures SQLs that would otherwise leave.
- **Priority:** Medium. **Complexity:** Medium.
- **Dependencies:** Calendar embed (Cal.com / Calendly).
- **Suggested UI Placement:** Centered dialog triggered on mouse-leave (desktop) / back-button (mobile), max once per session.
- **Expected Impact:** 2–4% recovered visitors.
- **Mock User Journey:** Visitor mouses toward tab bar → modal appears → picks a slot.

---

## 2. Trust Building Improvements

### 2.1 Customer logo strip
- **Location:** Homepage below Hero, Pricing above plan grid.
- **Purpose:** Social proof through recognizable client logos.
- **User Benefit:** Instant credibility signal.
- **Business Benefit:** Higher conversion from cold traffic.
- **Priority:** High. **Complexity:** Low.
- **Dependencies:** Permission from referenced firms.
- **Suggested UI Placement:** Grayscale horizontal strip, 5–8 logos.
- **Expected Impact:** Established SaaS pattern; typical +5–10% conversion.
- **Mock User Journey:** Visitor reads hero → sees recognised firm logos → scrolls with increased trust.

### 2.2 Security / compliance badge row
- **Location:** Footer + Security page hero.
- **Purpose:** Make SOC2 / GDPR / ISO posture visible.
- **User Benefit:** Reassurance for compliance-conscious buyers.
- **Business Benefit:** Shorter security review cycle in enterprise deals.
- **Priority:** Medium. **Complexity:** Low.
- **Dependencies:** Actual certifications or in-progress statuses.
- **Suggested UI Placement:** Inline icon row above the copyright line in `Footer.tsx`.
- **Expected Impact:** Qualitative — fewer security questionnaires before contract.
- **Mock User Journey:** Buyer scans footer → spots GDPR badge → clicks Security page for detail.

### 2.3 Photo + company testimonials
- **Location:** Existing Testimonials section.
- **Purpose:** Replace text-only quotes with named, attributed quotes.
- **User Benefit:** Verifiability of social proof.
- **Business Benefit:** Higher perceived credibility.
- **Priority:** Medium. **Complexity:** Low.
- **Dependencies:** Customer permission + headshots.
- **Suggested UI Placement:** Card layout with avatar, name, role, company.
- **Expected Impact:** Measurable lift in time-on-page.
- **Mock User Journey:** Visitor reads quote → recognizes role/firm → trusts more.

### 2.4 Case-study page
- **Location:** New route `/customers/:slug`, linked from Testimonials + nav.
- **Purpose:** Long-form proof stories with metrics.
- **User Benefit:** Detailed evidence of outcomes.
- **Business Benefit:** Sales enablement asset; SEO long-tail.
- **Priority:** Medium. **Complexity:** Medium.
- **Dependencies:** First customer story drafted.
- **Suggested UI Placement:** Card grid index at `/customers`, full page per study.
- **Expected Impact:** Strong influence on mid-funnel.
- **Mock User Journey:** Visitor clicks testimonial → reads full story → returns to /pricing.

---

## 3. Landing Page Enhancements

### 3.1 Replace letter-placeholder mockups with real screenshots
- **Location:** `src/components/landing/Hero.tsx`, `FeatureMockUIs.tsx`.
- **Purpose:** Show the actual product, not abstract placeholders.
- **User Benefit:** Concrete sense of what they're buying.
- **Business Benefit:** Lower bounce, higher sign-up intent.
- **Priority:** High. **Complexity:** Low (once screenshots exist).
- **Dependencies:** Polished product screenshots / Figma renders.
- **Suggested UI Placement:** In existing hero canvas with subtle shadow + border.
- **Expected Impact:** Often the single largest landing-page lift.
- **Mock User Journey:** Visitor lands → immediately understands product surface area.

### 3.2 Inline animated demo
- **Location:** Below Hero on homepage.
- **Purpose:** 20-second loop showing upload → extract → categorise.
- **User Benefit:** Understanding without watching a sales video.
- **Business Benefit:** Reduces "what does it actually do" friction.
- **Priority:** Medium. **Complexity:** Medium.
- **Dependencies:** Recorded demo or Lottie animation.
- **Suggested UI Placement:** Full-width band with autoplay-muted-loop video.
- **Expected Impact:** Strong engagement signal.
- **Mock User Journey:** Visitor watches loop → clicks Get Started.

### 3.3 ROI / savings calculator
- **Location:** New section on Pricing page (display only, no API change).
- **Purpose:** Quantify time/cost saved per client.
- **User Benefit:** Personal, concrete value estimate.
- **Business Benefit:** Powerful price-justification tool.
- **Priority:** Medium. **Complexity:** Medium.
- **Dependencies:** Agreed multipliers from product team.
- **Suggested UI Placement:** Above plan grid, simple slider inputs.
- **Expected Impact:** Higher willingness to pay.
- **Mock User Journey:** Visitor drags client-count slider → sees £/month saved → picks plan.

---

## 4. Navigation Improvements

### 4.1 Mega-menu for Product
- **Location:** Header desktop nav.
- **Purpose:** Show all product entry points (Features, How It Works, VAT, integrations) with icons.
- **User Benefit:** Faster discovery of relevant sub-pages.
- **Business Benefit:** Higher engagement across product surface.
- **Priority:** Low. **Complexity:** Medium.
- **Dependencies:** Final product taxonomy.
- **Suggested UI Placement:** Full-width dropdown under "Product".
- **Expected Impact:** Better page-views per session.
- **Mock User Journey:** Hover "Product" → see grid → click VAT Compliance.

### 4.2 Breadcrumbs on Blog and Docs
- **Location:** Blog post hero, ApiDocs page.
- **Purpose:** Orient deep visitors and improve SEO.
- **User Benefit:** Easy navigation back up the hierarchy.
- **Business Benefit:** SEO breadcrumb rich results.
- **Priority:** Medium. **Complexity:** Low.
- **Dependencies:** None.
- **Suggested UI Placement:** Small text crumb above post title.
- **Expected Impact:** Better SERP appearance.
- **Mock User Journey:** Reader lands on deep blog post from Google → clicks "Blog" crumb to browse more.

### 4.3 In-page table of contents on long docs
- **Location:** `Privacy`, `Terms`, `ApiDocs`, long blog posts.
- **Purpose:** Jump-to-section sidebar.
- **User Benefit:** Find clauses fast.
- **Business Benefit:** Reduced bounce on legal pages.
- **Priority:** Low. **Complexity:** Low.
- **Dependencies:** Headings already exist.
- **Suggested UI Placement:** Right-rail sticky list on `lg+`.
- **Expected Impact:** Improved page comprehension.
- **Mock User Journey:** Visitor opens Terms → clicks "Data" entry → page scrolls.

---

## 5. SEO Improvements

### 5.1 Per-post og:image
- **Location:** `BlogPost.tsx` — pass `image` prop to `Seo` (now supported).
- **Purpose:** Branded share previews per post.
- **User Benefit:** Recognizable social cards.
- **Business Benefit:** Higher CTR from social channels.
- **Priority:** High. **Complexity:** Low.
- **Dependencies:** Per-post hero image assets.
- **Suggested UI Placement:** N/A (head only).
- **Expected Impact:** Typical 2× social CTR vs. default card.
- **Mock User Journey:** Reader shares post on LinkedIn → rich card appears.

### 5.2 JSON-LD Article on BlogPost
- **Location:** `BlogPost.tsx` head.
- **Purpose:** Eligible for Google news / rich results.
- **User Benefit:** Better SERP visibility.
- **Business Benefit:** Organic traffic uplift.
- **Priority:** Medium. **Complexity:** Low.
- **Dependencies:** Author + datePublished already in `blogPosts.ts`.
- **Suggested UI Placement:** Inline `<script type="application/ld+json">`.
- **Expected Impact:** Incremental organic CTR.
- **Mock User Journey:** N/A (crawler-facing).

### 5.3 Blog category / tag pages
- **Location:** New routes `/blog/category/:slug`.
- **Purpose:** Topic clustering for SEO.
- **User Benefit:** Browse by interest.
- **Business Benefit:** Long-tail keyword coverage.
- **Priority:** Low. **Complexity:** Medium.
- **Dependencies:** Categories already on posts.
- **Suggested UI Placement:** Linked from each post's category chip.
- **Expected Impact:** Modest long-tail traffic.
- **Mock User Journey:** Reader clicks "Compliance" tag → sees all compliance posts.

---

## 6. Performance Improvements

### 6.1 Image loading audit
- **Location:** All `<img>` tags across pages.
- **Purpose:** Ensure `loading="lazy"` + `decoding="async"` below the fold.
- **User Benefit:** Faster initial paint.
- **Business Benefit:** Better Core Web Vitals → SEO ranking.
- **Priority:** Medium. **Complexity:** Low.
- **Dependencies:** None.
- **Suggested UI Placement:** N/A.
- **Expected Impact:** LCP improvement on image-heavy pages.

### 6.2 Preconnect to Google Fonts
- **Location:** `index.html` head.
- **Purpose:** Reduce font-load latency.
- **User Benefit:** Faster perceived load.
- **Business Benefit:** CWV uplift.
- **Priority:** Medium. **Complexity:** Low.
- **Dependencies:** None.
- **Suggested UI Placement:** Two `<link rel="preconnect">` tags before the stylesheet.
- **Expected Impact:** 100–300ms LCP improvement on slow networks.

### 6.3 Route-level prefetch hints
- **Location:** Already partially handled by `SmoothNavLink`; extend to footer.
- **Purpose:** Warm chunks for likely next navigations.
- **User Benefit:** Instant transitions.
- **Business Benefit:** Smoother UX.
- **Priority:** Low. **Complexity:** Low.
- **Dependencies:** None.
- **Suggested UI Placement:** Reuse `SmoothNavLink` in `Footer.tsx`.
- **Expected Impact:** Subjective polish.

---

## 7. New Pages

### 7.1 `/customers` — Customer index
Long-form proof stories index. (See 2.4.)

### 7.2 `/changelog` — Public changelog
- **Purpose:** Show velocity to prospects + keep customers informed.
- **Priority:** Medium. **Complexity:** Low.
- **Mock User Journey:** Prospect checks "is this product alive?" → sees weekly updates.

### 7.3 `/compare/:competitor`
- **Purpose:** Capture comparison search queries.
- **Priority:** Medium. **Complexity:** Medium.
- **Mock User Journey:** Visitor searches "Outworx vs Dext" → lands on comparison.

### 7.4 `/integrations`
- **Purpose:** List Xero, QuickBooks, Stripe etc.
- **Priority:** High once integrations exist. **Complexity:** Low.

---

## 8. New Sections

### 8.1 FAQ on Pricing
- **Location:** Below plan grid (no API change).
- **Purpose:** Address pre-purchase objections inline.
- **Priority:** High. **Complexity:** Low.

### 8.2 "How it works" video on Homepage
- **Location:** Above Features.
- **Purpose:** 60-second product overview.
- **Priority:** Medium. **Complexity:** Medium.

### 8.3 Newsletter capture on Blog
- **Location:** Blog index sidebar + end of each post.
- **Priority:** Medium. **Complexity:** Low (requires email provider).

---

## 9. New Interactive Features

### 9.1 Live UK VAT rate widget
- **Location:** VAT Compliance section.
- **Purpose:** Show current rates with last-updated date.
- **Priority:** Low. **Complexity:** Medium.

### 9.2 Public demo sandbox
- **Location:** Linked from Hero ("Try without signing up").
- **Purpose:** Hands-on trial.
- **Priority:** High. **Complexity:** High.

### 9.3 Help-center launcher
- **Location:** Floating button site-wide.
- **Purpose:** Self-serve answers.
- **Priority:** Low. **Complexity:** Low (Intercom-style embed).

---

## 10. Future Product Opportunities

### 10.1 Slack / Teams notifications for ready-to-review items
Higher daily engagement; lower time-to-action on flagged items.

### 10.2 Zapier / Make app
Unlocks long-tail integrations without engineering effort per partner.

### 10.3 Self-service API keys
Once auth lands, expose key management so developers can evaluate without sales contact.

---

End of recommendations.

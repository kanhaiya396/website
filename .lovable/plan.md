## Why it is happening

The footer links are not actually loading separate pages twice. The duplicate-looking behavior comes from overlapping scroll handlers:

1. Footer hash links use React Router links like `/#features`, `/#how-it-works`, and `/#vat`.
2. The new `ScrollManager` reacts to route/hash changes and scrolls to the target section.
3. Browser/React Router hash behavior can also restore or jump scroll position around the same time.
4. On the homepage, clicking a hash link can therefore appear to scroll from the previous/below position, then jump/scroll again from the top.
5. On normal route links like `/pricing`, scroll restoration/history behavior can make pages appear to load twice or land at the previous scroll position before being corrected.

## Planned fix

### 1. Make scroll handling deterministic in `src/components/ScrollManager.tsx`
- Disable browser automatic scroll restoration where supported: `window.history.scrollRestoration = "manual"`.
- On every navigation:
  - If there is a hash, wait until the target element is present, then scroll to it once.
  - If there is no hash, immediately scroll to the top once.
- Cancel any pending delayed scroll when the user clicks another link quickly, preventing old scroll actions from firing after the new page starts loading.

### 2. Avoid smooth-scroll double animation on first landing
- For route changes to a hash from another page, use a controlled scroll after render so it does not first jump to top and then animate again.
- For same-page hash clicks, still keep the intended smooth scroll effect.

### 3. Leave working page content untouched
- No footer labels/copy changes.
- No layout, styling, colors, spacing, or component structure changes.
- No changes to Pricing fallback, SEO, Helmet, Header content, or page sections unless needed for scroll behavior.

## Expected result

- Footer links on the homepage scroll once to the correct section.
- Footer links from other pages navigate to the homepage and scroll once to the correct section.
- Normal footer links like Pricing, About, Blog, Privacy, Terms, etc. open at the top of their page.
- Pages should no longer appear to load twice due to scroll restoration/jump behavior.

## Verification

After implementation, I will check:
- `/` → footer Features / Integrations / VAT Compliance.
- `/pricing` → footer Features / Integrations / VAT Compliance.
- Footer Pricing/About/Blog/legal links → page opens at top.
- Console for any runtime errors.

## Scope protection

Only `ScrollManager` will be changed unless verification shows another scroll handler is directly conflicting.
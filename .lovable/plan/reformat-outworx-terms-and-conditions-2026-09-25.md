# Reformat Outworx Terms and Conditions

## Goal
Restyle the existing Terms of Service page to follow the supplied Nomi legal-page format while preserving all Outworx wording, links, navigation, footer, and theme support.

## Changes
- Add a clean, full-width title band beneath the site navigation with a centered “Terms and Conditions” heading.
- Place the legal copy in a narrower, readable document column with generous top and bottom spacing.
- Restyle numbered section headings with the Outworx accent colour, clear hierarchy, and compact legal-document spacing inspired by the reference.
- Improve paragraph, list, link, and “last updated” typography for long-form readability on desktop and mobile.
- Keep Outworx branding and both light and dark themes; do not copy Nomi’s promotional banner, floating sales widget, content, or branding.

## Verification
- Check the page at desktop and mobile widths in both themes.
- Confirm all existing terms content and links remain intact.
- Confirm the site builds without errors.

## Technical details
- Scope changes to `src/pages/Terms.tsx` and semantic styling utilities already available in the project.
- Use existing colour tokens and layout components so the page remains theme-safe and consistent with the rest of Outworx.

# Health Weight Pro — Release Notes

> User/stakeholder-facing summary of shipped functionality. For full technical detail and
> Work Package history, see `docs/HANDOFF.md`.

## Release 1.0 RC — Production Readiness (2026-07-10)

No new features. This release focused on preparing the Core MVP for daily real-world use.

**Fixed**
- Dashboard greeting showed the app's own name ("Good morning Health Weight Pro.") when no
  display name was set in Settings; it now shows a clean greeting without a name.
- The Service Worker cached every GET request indefinitely, including cross-origin requests,
  and could serve the app shell HTML in place of a failed image/script request. It now only
  cache-first-handles same-origin requests and only falls back to the app shell for page
  navigations. Cache version bumped so all users receive the corrected worker.
- Service worker registration failures now go through the app's logger (visible in Developer
  Mode → Export Application Logs) instead of a raw, unlogged console warning.

**Improved**
- Every bottom sheet / dialog / wizard now closes on the **Escape** key, matching the existing
  backdrop-click behavior.
- Card-style controls (Food Library, Favorite Meals, Meal Plans) that use `role="button"` are
  now keyboard-operable with **Enter** or **Space**, not just mouse/touch.
- Disabled buttons now have a consistent dimmed visual style app-wide instead of relying on
  inconsistent browser defaults.
- Verified no horizontal scrolling at 320px, 375px, 768px, and 1440px across Dashboard,
  Settings, Meal Plans, and Meal Journal.

**Verified (no regressions)**
Dashboard → Settings → Nutri IA+ → Food Library → Favorite Meals → Meal Plans → Meal Journal →
Weight → Medication → Daily Habits → Developer Mode, exercised live in-browser end-to-end with
zero application console errors.

---

## Release 0.3 (2026-07-08 – 2026-07-10)

- **Branding & Visual Identity** (WP 3.1): app icon, manifest, metadata.
- **Food Library** (WP 3.4 / 3.4.1): full CRUD food catalog, 226-item Brazilian-first starter
  catalog, "add to meal" flow.
- **Core Stabilization** (WP 3.4.2): catalog versioning infrastructure, Developer Mode, PWA
  cache-busting fix, Event Bus consistency fix.
- **Favorite Meals** (WP 3.5): save frequently-eaten meals built from Food Library items,
  one-tap registration into the Meal Journal, sortable list (Most Used / Recently Used /
  Alphabetical), "Save as Favorite" from a Nutri IA+ import.
- **Meal Plans** (WP 3.6): organize Favorite Meals into reusable daily eating plans, one-tap
  registration of an entire plan, configurable Visible Meal Slots in Settings (Breakfast/Lunch/
  Dinner always on; Morning Snack/Afternoon Snack/Pre Workout/Post Workout/Supper optional).

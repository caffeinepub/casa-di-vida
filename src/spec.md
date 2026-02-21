# Specification

## Summary
**Goal:** Debug and fix gallery image loading failure across all portfolio sections in the Casa Di Vida application.

**Planned changes:**
- Audit Portfolio component's image path construction to ensure correct /assets/generated/{category}-{number}.png pattern
- Verify all 120 gallery images (residential-1 through residential-40, commercial-1 through commercial-40, before-after-1 through before-after-40) exist in frontend/public/assets/generated directory
- Fix image rendering logic errors including array mapping, range calculation, and error boundaries
- Add comprehensive error logging for failed image loads (URLs, HTTP status, network errors, file existence, CORS issues)
- Verify Vite build configuration correctly serves static assets from public directory without transformation
- Test image loading in both development and production builds to identify environment-specific issues

**User-visible outcome:** All 120 gallery images load correctly across residential, commercial, and before-after portfolio sections with proper error handling and no 404 errors in the console.

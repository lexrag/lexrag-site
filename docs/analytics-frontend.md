### Frontend Analytics Architecture — aligned with Backend

## Goals and Principles

- **Single event ingress**: by default, all frontend events are sent to the backend (`/analytics/beacon`) where consent, rate limits, deduplication, normalization, and delivery to Segment are applied.
- **Backend-only identify/alias**: user identification and aliasing are performed on the backend. The frontend does not send `identify/alias` unless explicitly enabled.
- **Consistent naming**: `snake_case` (auto-normalized on the frontend).
- **Security**: the frontend strips sensitive fields from `properties`; the backend applies additional filters and masking.

## Event Flow (Frontend → Backend)

1) A component/hook calls `track('event_name', properties)`
2) If backend transport is enabled, the frontend posts `{event, properties}` to `POST /api/analytics/beacon` (frontend proxy)
3) The proxy forwards the request to `${NEXT_PUBLIC_API_BASE_URL}/analytics/beacon`
4) The backend receives the event, applies rules, and delivers to Segment

Aligned with Backend README: “Beacon Endpoint”, “Noise filtering”, “Rate limits”, “Idempotency”, “Security”.

## Key Frontend Modules

- `lib/analytics.ts`
  - Event name normalization to `snake_case`
  - `properties` sanitization (removes `email`, `password`, `token`, `authorization`, `secret`, `key`, `user_id`, `userId`, etc.)
  - Auto-add `meta.source='frontend'` and `marketing` context
  - Event transport:
    - With `NEXT_PUBLIC_ANALYTICS_VIA_BEACON=true` — send via `sendBeacon`/`fetch` to `/api/analytics/beacon`
    - Otherwise (for dev when needed) — send directly to Segment via analytics.js
  - `page()` is a no-op in beacon mode (page analytics handled by backend)
  - FE `identify/alias` disabled by default (`NEXT_PUBLIC_ANALYTICS_IDENTITY_FRONTEND=false`)

- `app/api/analytics/beacon/route.ts`
  - Proxy route that accepts `{event, properties}` and forwards to `${NEXT_PUBLIC_API_BASE_URL}/analytics/beacon`

- `lib/marketing-context.ts`
  - Extracts UTM/LinkedIn params from URL, stores first-touch/latest in `localStorage`, builds `marketing` for events

- `hooks/use-time-on-view.ts`, `components/analytics/ContentTimeTracker.tsx`
  - Time-on-view tracking: event `content_time_spent` with `{ area_id, spent_ms, is_final, ...extra }`
  - Options: `minThresholdMs`, `finalMinThresholdMs`, `disablePulses`, `sampleOneOutOf`, `pulseIntervalMs`
  - Conservative defaults (noise reduction)

## Alignment with Backend README

- “Unified User ID Flow”: the frontend does not initiate identify/alias — userId is established by the backend. FE maintains only a local `currentUserId` to avoid redundant calls.
- “Backend-Only Events”: by default, frontend events are delivered via the backend beacon.
- “Standardized Naming”: `lib/analytics.ts` enforces `snake_case`.
- “Security-First”: the frontend removes sensitive fields; backend is the final security layer.
- “Single Source of Truth”: final sending and configuration live on the backend; the frontend only builds safe payloads.
- “GA4 DebugView”: with `SEGMENT_DEBUG=true` the frontend adds `debug_mode`; backend may extend context as well.
- “Rate limits / Idempotency”: enforced on the backend; the frontend does not bypass them because it uses `/analytics/beacon`.

## Environment Variables

Frontend (`.env` / `.env.example`):
- `NEXT_PUBLIC_API_BASE_URL` — backend base URL (used by the proxy route)
- `NEXT_PUBLIC_ANALYTICS_VIA_BEACON` — `true` to route all events through the backend (recommended)
- `NEXT_PUBLIC_SEGMENT_ENABLED`, `NEXT_PUBLIC_SEGMENT_WRITE_KEY` — only needed if beacon transport is disabled and direct Segment sending is required (dev)
- `NEXT_PUBLIC_SEGMENT_DEBUG` — enables verbose logs/`debug_mode`
- `NEXT_PUBLIC_ANALYTICS_IDENTITY_FRONTEND=false` — disables FE identify/alias
- `NEXT_PUBLIC_BASE_URL`, `NEXT_PUBLIC_BASE_PATH` — for SEO/links
- Time-on-view noise control:
  - `NEXT_PUBLIC_ANALYTICS_DISABLE_PULSES`
  - `NEXT_PUBLIC_ANALYTICS_SAMPLE_CONTENT_PULSES`

Backend — see README.md (`SEGMENT_*`, `ANALYTICS_*`, limits, idempotency)

## Usage Recommendations

1) Enable backend transport (default in `.env.example`):
   - `NEXT_PUBLIC_ANALYTICS_VIA_BEACON=true`

2) Initialize marketing context once on the client (see `MarketingBootstrap`)

3) For screen areas where time-on-view matters, add `ContentTimeTracker` with conservative thresholds

4) Prefer typed `track_*` helpers from `lib/analytics.ts` over raw string event names

## Examples

Send a custom event:
```ts
import { track } from '@/lib/analytics';
track('feature_used', { feature: 'graph_filter', variant: 'by_labels' });
```

Time-on-view for a section:
```tsx
<ContentTimeTracker
  areaId="chat_main"
  disablePulses={true}
  minThresholdMs={3000}
  finalMinThresholdMs={5000}
  sampleOneOutOf={10}
/>
```

## Caveats and Limitations

- In `VIA_BEACON` mode, `page()` on the frontend is disabled; implement page analytics on the backend if needed.
- FE identify/alias are disabled by default and should be performed on the backend for identity consistency.
- When offline, the frontend enqueues events only for direct Segment mode; for beacon mode, rely on backend delivery guarantees (and implement retries server-side if needed).



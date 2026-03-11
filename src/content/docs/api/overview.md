---
title: API overview
description: Public APIs for the Prego platform.
---

Prego exposes APIs for tenant management, auth, billing, and related operations.

## Base URLs

- **Control Plane** — Set via your deployment config.
- **Auth** — Set via your auth URL env var.
- **Billing proxy** — Set when using a billing gateway.

## Authentication

Most API calls require a valid **JWT** or session token. Pass the token in the `Authorization` header or as configured.

## Main API areas

| Area | Purpose |
|------|--------|
| **Control Plane** | Tenant provisioning, config, health. |
| **Auth** | Login, signup, token refresh. |
| **Billing** | Plans, subscriptions (may be proxied). |

## Next steps

- [Quick start](/get-started/quickstart/) — Test connectivity.
- [Guides](/guides/authentication/) — Auth and integration guides.

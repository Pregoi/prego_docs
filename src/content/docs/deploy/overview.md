---
title: Deploy & ops overview
description: Deployment and operations for Prego.
---

This section summarizes deployment and operations.

## Deployment options

- **prego-docker** — Docker-based setup for running Prego services.
- **Cloudflare Workers** — Control-plane and other workers may be deployed to Cloudflare.
- **Vercel / Node** — admin-web and www are Next.js apps and can be deployed to Vercel or any Node host.

## Environment variables

- **admin-web** — `NEXT_PUBLIC_PREGO_WWW_BASE_URL`, `NEXT_PUBLIC_PREGO_CONTROL_PLANE_URL`, `NEXT_PUBLIC_PREGO_AUTH_URL`, etc.
- **Control-plane / workers** — See repo-specific `.env.example` or deployment docs.

## Operations

Runbooks (provisioning, troubleshooting) are in the main repo. This docs site provides a high-level overview and links.

## Next steps

- [Quick start](/get-started/quickstart/) — Local run.
- [API overview](/api/overview/) — API base URLs and auth.

---
title: Quick start
description: Get up and running with Prego in a few steps.
---

This quick start helps you run or integrate with Prego.

## Prerequisites

- **Node.js** 18+
- **pnpm** or npm
- **Environment variables** for auth, control-plane, and billing URLs when connecting to a real backend.

## Run admin-web locally

1. Clone the repo and install dependencies.
2. Set env vars (e.g. `.env.local`).
3. Start the dev server: `pnpm dev`
4. Open the app (e.g. `http://localhost:3002`).

## Call the Control Plane API

1. Obtain base URL and credentials for the Control Plane API.
2. Use the [API reference](/api/overview/) for endpoints.
3. Call health or a non-sensitive endpoint to verify connectivity.

## Next steps

- [Overview](/get-started/overview/) — Understand the platform.
- [Guides](/guides/authentication/) — Auth, billing, onboarding.
- [API & Reference](/api/overview/) — Integration details.

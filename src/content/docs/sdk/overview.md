---
title: SDKs & tools overview
description: Front-end and back-end integration options.
---

Prego can be integrated via web apps (React/Next.js), server-side code, and tooling.

## Front end

- **admin-web** — Next.js app for tenant admin: signup, login, dashboard, billing, profile, usage, users, portal.
- **www** — Next.js marketing/product site; uses shared shell and can link to admin-web for login/signup.

## Back end

- **Control-plane** — Backend services and workers that handle tenant provisioning, billing, and API logic.
- **Auth worker** — Handles auth flows and token issuance/validation.

## Using the APIs

From **front end**: use `fetch` or your HTTP client with the correct base URL and JWT.  
From **back end**: use the same APIs with server-side credentials or service tokens as designed.

## Next steps

- [API overview](/api/overview/) — Base URLs and auth.
- [Quick start](/get-started/quickstart/) — Run admin-web and call APIs.

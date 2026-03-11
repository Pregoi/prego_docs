---
title: Authentication
description: How authentication works in the Prego platform.
---

This guide summarizes how authentication is handled in Prego.

## Overview

- **admin-web (m.pregoi.com)** uses login/signup flows that issue or consume JWTs.
- **Control-plane** and other backends validate tokens and enforce tenant/user context.
- **Environment variables** configure where auth and API requests go.

## Login and signup

1. User visits the admin-web login or signup page.
2. After successful auth, the app receives a session (e.g. JWT).
3. Subsequent API calls include the token for authorization.

## Next steps

- [Billing](/guides/billing/) — Plans and payments.
- [Tenant onboarding](/guides/tenant-onboarding/) — Signup and provisioning flow.
- [API Reference](/api/overview/) — API authentication and headers.

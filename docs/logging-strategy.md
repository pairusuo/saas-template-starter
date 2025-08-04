# Authentication Logging Strategy

## Overview

This document outlines the balanced logging approach for authentication events that provides necessary visibility while protecting sensitive information.

## Logging Levels

### ✅ What We Log

**Authentication Events:**

- `[AUTH] USER_SIGNED_IN: user@example.com via google`
- `[AUTH] USER_REGISTERED: user@example.com via github`
- `[AUTH] USER_SIGNED_OUT`
- `[AUTH] REGISTRATION_ATTEMPT: user@example.com`

**Error Events:**

- `console.error()` for authentication failures
- `console.warn()` for configuration issues
- `console.error()` for API errors

### ❌ What We Don't Log

**Sensitive Information:**

- OAuth access tokens
- Client secrets
- JWT tokens content
- Password hashes
- PKCE codes
- Cookie values
- Full user profiles

**Unnecessary Verbose Information:**

- NextAuth internal debugging
- OAuth flow details
- Session management internals

## Configuration

### Development Environment

- Essential auth events: ✅ Enabled
- Error logging: ✅ Enabled
- NextAuth debug: ❌ Disabled (can be enabled via `AUTH_DEBUG="true"`)

### Production Environment

- Essential auth events: ✅ Enabled
- Error logging: ✅ Enabled
- NextAuth debug: ❌ Disabled

## Benefits

1. **Security**: No sensitive data exposure in logs
2. **Monitoring**: Track important authentication events
3. **Debugging**: Error logs help troubleshoot issues
4. **Compliance**: Reduces risk of logging sensitive user data
5. **Performance**: Minimal logging overhead

## Example Output

```
[AUTH] USER_SIGNED_IN: john@example.com via google
[AUTH] USER_SIGNED_OUT
[AUTH] REGISTRATION_ATTEMPT: jane@example.com
```

## Enabling Debug Mode

For detailed troubleshooting, you can temporarily enable NextAuth debug logging:

```bash
# In .env.local
AUTH_DEBUG="true"
```

**⚠️ Warning**: Only enable debug mode in development and disable immediately after troubleshooting.

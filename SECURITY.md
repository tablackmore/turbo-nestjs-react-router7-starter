# Security Documentation

## Overview

This document outlines the security measures implemented in this application to protect
against common vulnerabilities and ensure best practices.

## Implemented Security Features

### 1. Authentication & Authorization

- **JWT Authentication**: Secure token-based authentication using `@nestjs/jwt`
- **Protected Routes**: All API endpoints require authentication except public ones (health, login)
- **Demo Credentials**: Username: `admin`, Password: `admin123`

### 2. Input Validation

- **Strict Validation**: Global validation pipe with `forbidNonWhitelisted: true`
- **DTO Validation**: All inputs validated using `class-validator` decorators
- **Type Safety**: TypeScript strict mode enabled

### 3. Rate Limiting

- **Throttling**: 10 requests per 60 seconds per IP
- **Protected Endpoints**: Rate limiting on authentication endpoints
- **Configuration**: Adjustable via environment variables

### 4. Security Headers

- **Helmet.js**: Comprehensive security headers including:
  - Content Security Policy (CSP)
  - X-Frame-Options
  - X-Content-Type-Options
  - Strict-Transport-Security (HSTS)

### 5. CORS Configuration

- **Environment-based**: CORS origins configured via environment variables
- **Credentials Support**: Properly configured for authenticated requests
- **Methods Whitelist**: Only necessary HTTP methods allowed

### 6. Environment Security

- **Configuration Validation**: Environment variables validated on startup
- **Secrets Management**: JWT secrets stored in environment variables
- **.env Protection**: Environment files excluded from version control

## Security Checklist

### Critical (Completed)

- ✅ Fixed npm vulnerabilities (3 critical/high resolved)
- ✅ TypeScript strict mode enabled
- ✅ JWT authentication implemented
- ✅ Rate limiting configured
- ✅ Security headers (Helmet.js) enabled
- ✅ CORS properly configured
- ✅ Input validation enforced
- ✅ Environment variables secured

### Best Practices (Implemented)

- ✅ Password hashing with bcrypt
- ✅ Global error handling
- ✅ Request/response interceptors
- ✅ Structured error responses
- ✅ Health check endpoints
- ✅ API versioning

## Configuration

### Environment Variables

```bash
# JWT Configuration
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=1d

# Rate Limiting
THROTTLE_TTL=60  # seconds
THROTTLE_LIMIT=10  # requests per TTL

# CORS
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### API Authentication

To authenticate API requests:

1. Login to get JWT token:

```bash
curl -X POST http://localhost:3001/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "admin123"}'
```

1. Use token in requests:

```bash
curl http://localhost:3001/v1/items \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Public Endpoints

The following endpoints are accessible without authentication:

- `GET /` - Root endpoint
- `GET /v1/health` - Health check
- `POST /auth/login` - Authentication

## Security Recommendations for Production

1. **Change Default Secrets**: Update JWT_SECRET with a strong, random value
2. **Use HTTPS**: Always use TLS/SSL in production
3. **Database Security**: When adding a database, use parameterized queries
4. **Monitoring**: Implement security event logging and monitoring
5. **Update Dependencies**: Regularly update dependencies for security patches
6. **Secrets Management**: Use a proper secrets management solution
   (AWS Secrets Manager, HashiCorp Vault, etc.)
7. **API Keys**: Consider implementing API key authentication for service-to-service communication
8. **Audit Logging**: Log all authentication attempts and sensitive operations

## Vulnerability Reporting

If you discover a security vulnerability, please report it to the security team immediately.
Do not disclose vulnerabilities publicly until they have been addressed.

## Regular Security Tasks

- Run `npm audit` weekly to check for new vulnerabilities
- Review and update dependencies monthly
- Conduct security code reviews for all changes
- Test rate limiting and authentication regularly
- Monitor for suspicious activity in logs

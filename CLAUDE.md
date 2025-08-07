# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `npm run dev` - Start all applications simultaneously (API on port 3001, Web on port 5173)
- `npm run build` - Build all packages and applications for production
- `npm run quality-check` - Run complete quality pipeline (format check, lint, type check, build)

### Code Quality

- `npm run lint` - Run Biome linter
- `npm run lint:fix` - Auto-fix linting issues
- `npm run lint:md` - Run markdown linter
- `npm run format` - Format code with Biome
- `npm run check-types` - Type check all packages

### Testing

From root (runs across monorepo):

- `cd apps/api && npm run test` - Run API unit tests
- `cd apps/api && npm run test:e2e` - Run API end-to-end tests
- `cd apps/api && npm run test:cov` - Generate test coverage report

To run a single test file:

- `cd apps/api && npm run test -- path/to/file.spec.ts`

## Architecture

This is a Turborepo monorepo with the following structure:

### Applications

- **apps/api**: NestJS REST API server
  - URL-based versioning (/v1/)
  - Standard response format with success/data/meta structure
  - OpenAPI/Swagger documentation at /api-docs
  - Global error handling and validation pipes
  - Jest for testing with separate e2e configuration

- **apps/web**: React 19 + React Router v7 frontend
  - Server-side rendering enabled
  - Uses React 19 features (useActionState, useOptimistic)
  - Type-safe API integration
  - Tailwind CSS v4 for styling

### Shared Packages

- **packages/ui**: Shared React component library
  - Design system components with variants
  - Tailwind CSS with custom design tokens
  - Exported via barrel exports from index.ts

- **packages/typescript-config**: Shared TypeScript configurations
  - base.json, nestjs.json, react.json configurations
  - Strict mode enabled across all packages

### Key Architectural Patterns

#### API Response Structure

All API responses follow a consistent format:

```typescript
{
  success: boolean,
  data: T | T[],
  meta?: {
    page: number,
    limit: number,
    totalCount: number,
    totalPages: number
  }
}
```

#### Frontend State Management

- React Router v7 handles routing and data loading
- Optimistic UI updates using React 19's useOptimistic
- Form handling with useActionState for enhanced UX

#### Code Organization

- Biome for consistent formatting (2 spaces, semicolons, single quotes)
- TypeScript strict mode throughout
- Separate Biome configurations for Node.js (API) vs React (Web/UI)
- Turborepo caching for efficient builds

#### Development Workflow

- Hot reload enabled across all applications
- Chrome DevTools workspace mapping supported
- Environment-specific configurations
- Health check endpoints for monitoring (/health in API)

## Pre-commit Quality Checks

**IMPORTANT**: Always run these commands before creating any git commit:

### Recommended: Single Command

- `npm run quality-check` - Runs the complete quality pipeline (check + lint:md + check-types + build)

### Individual Commands (if needed)

1. `npm run check` - Check code style, formatting, and imports with Biome
2. `npm run lint:md` - Check markdown formatting
3. `npm run check-types` - Verify TypeScript types across all packages
4. `npm run build` - Ensure everything compiles successfully
5. `npm run test` (when applicable) - Run test suite

**Note**: If `npm run check` shows formatting errors, run `npm run format` to auto-fix them,
then run `npx biome check --fix .` to organize imports.

These checks ensure code quality and prevent broken commits. All checks must pass before
committing changes.

## Commit Message and PR Title Guidelines

**IMPORTANT**: This repository enforces specific commit scopes. All commit messages and PR titles
must use one of the allowed scopes:

### Allowed Scopes

- `api` - Backend/API changes (NestJS, authentication, validation, etc.)
- `web` - Frontend changes (React Router, UI components, etc.)
- `ui` - Shared UI component library changes
- `typescript-config` - TypeScript configuration changes
- `auth` - Authentication and authorization specific changes
- `users` - User management related changes
- `routing` - Routing configuration and setup
- `database` - Database schema, migrations, queries
- `validation` - Input validation and schema changes
- `deps` - Dependency updates and package management
- `config` - Configuration files and environment setup
- `scripts` - Build scripts, automation, tooling
- `docker` - Docker configuration and containerization
- `ci` - Continuous integration and deployment
- `monorepo` - Monorepo structure and workspace configuration
- `workspace` - Workspace-level changes affecting multiple packages
- `docs` - Documentation updates

### Format Examples

- `feat(api): add JWT authentication system`
- `fix(web): resolve routing issue in navigation`
- `chore(deps): update security dependencies`
- `docs(api): update API documentation`

### Important Format Rules

- **Subject must be lowercase** - Use `feat(api): add feature` not `feat(api): Add feature`
- **Use imperative mood** - Write as if completing "This commit will..."
- **No period at end** - Keep subjects concise without trailing punctuation

**Note**: Use the most specific scope for your changes. For security improvements affecting the API,
use `api` scope rather than creating a `security` scope.

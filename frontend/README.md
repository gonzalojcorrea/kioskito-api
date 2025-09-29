# Kioskito Angular App

This project is a manually scaffolded Angular 18-style standalone application (created without the CLI due to missing Node installation in the environment) that demonstrates:

- Standalone bootstrap (`bootstrapApplication`)
- Standalone components (no NgModules)
- Lazy-loaded feature routes
- Basic authentication service using Angular signals
- Functional route guard
- Dashboard layout + login flow

## Structure
```
src/
  main.ts                # Bootstraps AppComponent with providers
  app/
    app.component.ts     # Root shell (router outlet)
    app.routes.ts        # Root routing configuration
    core/auth/
      auth.service.ts    # Auth state using signals + localStorage
      auth.guard.ts      # Functional guard protecting dashboard
    features/
      auth/login/        # Login standalone component
      dashboard/
        dashboard.routes.ts
        layout/dashboard-layout.component.ts
        home/dashboard-home.component.ts
```

## Auth Flow
- Visiting `/dashboard` triggers `authGuard`.
- If not authenticated, user is redirected to `/login`.
- Login accepts any non-empty email/password, stores a fake token in `localStorage`.
- Logout clears state.

## Next Steps (after installing Node & Angular CLI)
1. Install dependencies:
```bash
npm install
```
2. (Optional) Add Angular Material for richer UI:
```bash
npm install @angular/material @angular/cdk @angular/animations
```
3. Update `main.ts` to include `provideAnimations()` (already present) and replace plain HTML form in `LoginComponent` + layout with Material components.
4. Run the dev server:
```bash
npx ng serve
```

## Adding Angular Material Scaffold (Planned)
A shared material module (or simply an array of imports) can be introduced for commonly used components: toolbar, sidenav, button, icon, form-field, input, list, menu.

## Disclaimer
Because the environment currently lacks Node.js, TypeScript errors are shown in the editor for unresolved Angular imports. Once dependencies are installed, these will resolve.

---
Happy coding!

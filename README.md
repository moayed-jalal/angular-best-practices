# Angular Best Practices Project Structure

This project demonstrates a professional Angular project structure designed to be maintainable, scalable, and easy to understand. This structure can be followed in all Angular projects to ensure good organization and separation of concerns.

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core services and shared modules
│   │   ├── auth.guard.ts        # Authentication guard for route protection
│   │   ├── auth.interceptor.ts  # HTTP interceptor for adding tokens
│   │   └── services/            # Core services (e.g., auth, config)
│   │
│   ├── features/                # Application features, each in a separate folder
│   │   ├── dashboard/           # Dashboard feature with statistics
│   │   │   ├── dashboard.component.ts
│   │   │   ├── dashboard.component.html
│   │   │   └── dashboard.component.scss
│   │   ├── login/               # Login feature with auto-redirect
│   │   │   ├── login.component.ts
│   │   │   ├── login.component.html
│   │   │   └── login.component.scss
│   │   ├── products/            # Products management with popout dialogs
│   │   │   ├── products.component.ts
│   │   │   ├── products.component.html
│   │   │   ├── products.component.scss
│   │   │   ├── add-product-dialog.component.ts
│   │   │   ├── add-product-dialog.component.html
│   │   │   ├── add-product-dialog.component.scss
│   │   │   ├── edit-product-dialog.component.ts
│   │   │   ├── edit-product-dialog.component.html
│   │   │   └── edit-product-dialog.component.scss
│   │   ├── todos/               # Todos management with popout dialogs
│   │   │   ├── todos.component.ts
│   │   │   ├── todos.component.html
│   │   │   ├── todos.component.scss
│   │   │   ├── todo-dialog.component.ts
│   │   │   ├── todo-dialog.component.html
│   │   │   └── todo-dialog.component.scss
│   │   ├── admins/              # Admins management with popout dialogs
│   │   │   ├── admins.component.ts
│   │   │   ├── admins.component.html
│   │   │   ├── admins.component.scss
│   │   │   ├── admin-dialog.component.ts
│   │   │   ├── admin-dialog.component.html
│   │   │   └── admin-dialog.component.scss
│   │   └── ...                  # Other features
│   │
│   ├── models/                  # Data models (interfaces)
│   │   ├── user.model.ts        # User, auth, product, todo, admin models
│   │   └── ...                  # Other models
│   │
│   ├── services/                # Application services
│   │   ├── auth.service.ts      # Authentication service with localStorage
│   │   ├── product.service.ts   # Product management service
│   │   ├── todo.service.ts      # Todo management service
│   │   ├── admin.service.ts     # Admin management service
│   │   └── ...                  # Other services
│   │
│   ├── shared/                  # Shared components and utilities
│   │   ├── components/          # Shared components
│   │   │   ├── header/          # Header component with navigation
│   │   │   │   ├── header.component.ts
│   │   │   │   ├── header.component.html
│   │   │   │   └── header.component.scss
│   │   │   └── ...              # Other shared components
│   │   ├── directives/          # Custom directives
│   │   ├── pipes/               # Custom pipes
│   │   └── utils/               # Helper utilities
│   │
│   ├── app.component.ts         # Main app component
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.config.ts            # App configuration (providers, interceptors)
│   ├── app.routes.ts            # Route definitions with lazy loading
│   └── main.ts                  # App entry point
│
├── assets/                      # Static assets (images, icons, etc.)
├── environments/                # Environment configurations (dev, prod)
├── index.html                   # Main HTML file
├── main.ts                      # Angular entry point
└── styles.scss                  # Global styles
```

## Structure Explanation

### 1. **app/core/**
   - Contains core services and modules that don't change often.
   - Example: Guards, Interceptors, Core services.
   - **Why?** Separation of concerns; these are shared across all features.

### 2. **app/features/**
   - Each feature in a separate folder (Feature Modules).
   - Each folder contains its components, services, and models.
   - Includes sub-components like dialogs for popout modals.
   - **Why?** Easier feature management, Lazy Loading, avoiding component bloat.

### 3. **app/models/**
   - Definition of interfaces and types for data.
   - **Why?** Centralized data definitions, easier maintenance.

### 4. **app/services/**
   - General application services with localStorage persistence.
   - **Why?** Separation of business logic from components.

### 5. **app/shared/**
   - Components, directives, pipes used in multiple places.
   - **Why?** Reusability, avoiding duplication.

### 6. **app.config.ts**
   - App configurations: Providers, Interceptors, HTTP client.
   - **Why?** Centralized configurations.

### 7. **app.routes.ts**
   - Route definitions with Guards and Lazy Loading.
   - **Why?** Separation of routing from components.

## Features Implemented

- **Authentication**: Login with email/password, auto-redirect if already logged in.
- **Dashboard**: Overview with statistics for products, admins, and todos by status.
- **Products Management**: Full CRUD with add/edit/delete dialogs.
- **Todos Management**: Full CRUD with status updates and add/edit/delete dialogs.
- **Admins Management**: Full CRUD with roles and add/edit/delete dialogs.
- **Search**: Real-time search in admins list.
- **Responsive Design**: Mobile-friendly layouts using Tailwind CSS.

## Design Principles Followed

- **Standalone Components**: Using standalone components to reduce dependencies.
- **Lazy Loading**: Loading features on demand for better performance.
- **Separation of Concerns**: Separating UI, Business Logic, and Data.
- **DRY (Don't Repeat Yourself)**: Code reusability.
- **Scalability**: Structure scales with project growth.
- **Testability**: Easy to write tests.
- **Popout Dialogs**: Using modal dialogs for forms to improve UX.

## How to Use This Structure

1. **Adding a new feature**: Create a folder in `features/` with its components.
2. **New service**: Add in `services/` with localStorage persistence.
3. **Shared component**: Add in `shared/components/`.
4. **New model**: Add in `models/`.
5. **Dialogs**: Create separate dialog components for popout forms.

## Tools and Technologies

- Angular CLI for generating components and services.
- RxJS for state and event management.
- Tailwind CSS for styling (optional).
- TypeScript for static typing.
- localStorage for data persistence (frontend only).

## Running the Project

```bash
npm install
ng serve
```

## Testing

```bash
ng test
ng e2e
```

This structure ensures professional, maintainable Angular projects. It can be adapted based on project needs, but maintaining separation of concerns is essential.

## Key Features Demonstrated

- Professional Angular architecture.
- Reactive forms with validation.
- State management with RxJS and BehaviorSubject.
- Modal dialogs for better UX.
- Search functionality.
- Authentication flow with guards.
- Dashboard with real-time statistics.
- localStorage for data persistence.

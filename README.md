## ProfileSettingFront
This project was generated with Angular CLI version 17.3.8.
Application Overview
Angular 17 application for managing profiles, scopes, and partners for CACIB system with advanced permissions and Material Design UI.
Key Features:

## Profile management with business validation
Scope management with auto-incremented ranks
Partner management with queue autocomplete
User context simulation (rank 3 permissions)
Internationalization (FR/EN)

## Development server
Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.
Code scaffolding
Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.
Build
Run ng build to build the project. The build artifacts will be stored in the dist/ directory.
Running unit tests
Run ng test to execute the unit tests via Karma.
Running end-to-end tests
Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
Technology Stack

## Framework: Angular 17 (Standalone Components)
UI Library: Angular Material
Forms: Reactive Forms with custom validators
State Management: RxJS + Services
Styling: SCSS + Material Theming
Performance: OnPush Change Detection Strategy

Architecture
src/app/
├── core/                 # Services and models
├── features/            # Business modules
│   ├── profile/        # Profile management
│   └── settings/       # Scopes & Partners
├── shared/             # Reusable components
└── assets/i18n/        # Translation files
## Mock Data
The application uses simulated API calls with:

1.5 second delay simulation
5% random error rate
Complete CRUD operations
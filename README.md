# CloudAz Portal

CloudAz Portal is the landing site for www.cloudaz.com

## Introduction

CloudAz Portal is build to run from S3. Once the changes are commited into the master branch,
CI/CD will push the code to stanging for testing and verification. After approval, CI/CD will
then push into production.

## Technology Stack Requirements

* Frontend: Angular 12/Typescript
* Backend Services: AWS lambda functions
* Database: None

## Installation

To build and deploy the project requires Node.js 14.x

### Building Custom Bulma Theme

1. Go to `custom_bulma` folder
2. Run `dart pub get` to install all the required dependencies (Note: Requires Dart to be installed)
3. Run `dart .\compile-sass.dart .\custom_bulma.scss custom_bulma.css` to generate the `custom_bulma.css`
4. Copy `custom_bulma.css` into `src\assets\css` directory

### Build for production deployment

1. Run `npm install` to install all the required js libraries
2. Run `ng build --configuration production` to build the project for production deployment
3. Copy build artifacts in the "dist/" directory to production

### Build for Development

1. Run `npm install` to install all the required js libraries
2. Run `ng serve` to start a dev server.
3. Navigate to "http://localhost:4200/" to start testing.
4. The app will automatically reload when source files are modified.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

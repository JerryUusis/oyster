# Oyster E2E Testing Setup with Playwright

Oyster uses [Playwright](https://playwright.dev/) to perform end-to-end (e2e) testing. This testing ensures that the frontend and backend work together correctly by simulating real user interactions with the application. The tests run on multiple browsers and devices, ensuring cross-browser compatibility.

## Prerequisites

Have following installations

- [Node.js](https://nodejs.org/en/download/package-manager) version 16.0 or higher

To start developing using [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite) you need to have following items installed. Please check the [official documentation](https://firebase.google.com/docs/emulator-suite/install_and_configure) for more details.
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Java JDK](https://jdk.java.net/) version 11 or higher.


## Installation 

Install dependencies from the root folder with the following command

```bash
npm install
```

You also need to have an `.env` file in the root folder that has identical variables as the backend, since `playwright.config.ts` will be launching the backend server from the [`webServer`](https://playwright.dev/docs/test-webserver) object. Environmental variables will be exported from `config.ts`.

## Usage

For running the tests you need to make sure you have Firebase emulators running on the background. You can launch them from the `oyster_backend` folder with the following command:

```bash
npm run emulators
```

Then you can run the tests with the following command from `e2e` folder:

```bash
npm run test
```

You can launch Playwright in [UI mode](https://playwright.dev/docs/test-ui-mode) with the following command from `e2e` folder:

```bash
npm run test:ui
```

Alternatively you can launch the emulators and [execute](https://firebase.google.com/docs/emulator-suite/install_and_configure#startup) e2e tests for a single test run with the following command from `oyster_back` folder:

```bash
firebase emulators:exec --project <your-firebase-project-id> "cd ../e2e && npm run test"
```

# Oyster backend

The backend of Oyster is traditional REST-server application. It's built with [Express](https://expressjs.com/) and [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup). 

## Development

Before running any commands please remember to install the required dependecies first!

```bash
npm install
```

### Recommended development process

#### Initialization

##### Firebase Local Emular suite

To start developing using [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite) you need to have following items installed. Please check the [official documentation](https://firebase.google.com/docs/emulator-suite/install_and_configure) for more details.
- [Node.js](https://nodejs.org/en/download/package-manager) version 16.0 or higher
- [Firebase CLI](https://firebase.google.com/docs/cli)
- [Java JDK](https://jdk.java.net/) version 11 or higher.

##### Environmental variables

Oyster is using [dotenv](https://www.npmjs.com/package/dotenv) to set environmental variables. Environmental variables are set in `/utils/config.ts` and exported from there. Create a file in the root level named `.env` and add following variables there. More info about the usage can be found on the [offical documentation](https://www.npmjs.com/package/dotenv).

For launching the Firebase Admin SDK you need to [generate a service .json file](https://firebase.google.com/docs/admin/setup#initialize_the_sdk_in_non-google_environments) to get the service account credentials. Service account credentials are needed to create the `ServiceAccount` object that initializes the Firebase Admin SDK in `/src/services/firebaseAdmin.ts`.

Sample `.env` file 

```bash
#.env

# These are for launching the backend server in the desired port and host
# The PORT determines which port the backend server will listen on.
PORT=3001
# The HOST specifies the hostname or IP address where the backend server will run.
HOST=localhost

# These are for the Firebase Admin SDK Service Account object
# FIREBASE_PRIVATE_KEY: The private key associated with the Firebase service account.
# This key should be copied directly from the service account JSON file, keeping the "BEGIN" and "END" lines intact.
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\nMIIEv...AB\n-----END PRIVATE KEY-----

# FIREBASE_PROJECT_ID: The unique project ID for your Firebase project.
# This is found in the Firebase Console under Project Settings.
FIREBASE_PROJECT_ID=fake-oyster-project-12345

# FIREBASE_CLIENT_EMAIL: The client email associated with the service account for your Firebase project.
# It is also found in the service account JSON file, typically looks like a generated email address.
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-abcde@fake-oyster-project-12345.iam.gserviceaccount.com

```

##### Other environmental variables

The project is also using other environmental variables which are not loaded from the `.env` file. 

Environemental variable `NODE_ENV` is set dynamically depending on how you launch the server.

```bash
# NODE_ENV = "development"
npm run dev

# NODE_ENV = "test"
npm run test

# NODE_ENV = "production"
npm run start
```

`NODE_ENV` is affecting how will the application interact with Firebase Emulators. See the following snippet from `firebaseAdmin.ts`.

If environmental variables `FIRESTORE_EMULATOR_HOST` or `FIREBASE_AUTH_EMULATOR_HOST` exist the application will automatically use Firebase local emulators for said products. Check docs for connecting [Firestore](https://firebase.google.com/docs/emulator-suite/connect_firestore#admin_sdks) and [Authentication](https://firebase.google.com/docs/emulator-suite/connect_auth#admin_sdks) to emulators for more info.


```javascript
// firebaseAdmin.ts

// Use Firebase emulators for test and dev environments
if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development" || process.env.NODE_ENV === "CI") {
  process.env.FIRESTORE_EMULATOR_HOST = "127.0.0.1:8080";
  process.env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
}
```

#### Start coding!

It's recommended to use Firebase Local Emulator Suite for development and testing purposes instead of using actual online Firestore database. Development with emulators should  follow these steps: 

1. Launch the development server using the following script
```bash
npm run dev
```

2. Open a new terminal window and run following script to launch the Firebase Local Emulator Suite
```bash
npm run emulators
```

### Testing

For testing purposes you only need to run the emulators. Testing uses Vitest for test runner. All the HTTP requests done by [Supertest](https://ladjs.github.io/superagent/#request-basics) will interact with the Firestore emulators directly. This means you don't have to run development server to run the (integration) tests.

You can run all the tests in the `__tests__` folder by running the following script:

```bash
npm run test
```

## Features

### Implemented 
- [Custom authentication system](https://firebase.google.com/docs/auth/web/custom-auth) using Firebase [Custom Tokens](https://firebase.google.com/docs/auth/admin/create-custom-tokens) in `login.ts`. 
- CRUD operations for users in [Firestore](https://firebase.google.com/docs/firestore) database in different endpoints in `user.ts`


### Technologies used
- [Express](https://expressjs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
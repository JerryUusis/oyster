# Oyster backend

The backend of Oyster is traditional REST-server application. It's built with [Express](https://expressjs.com/) and [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup). 

## Development

Before running any commands please remember to install the required dependecies first!

```bash
npm install
```

### Recommended development process

It's recommended to use [Firebase Local Emulator Suite](https://firebase.google.com/docs/emulator-suite) for development and testing purposes instead of using the actual database. Development with emulators should  follow these steps: 

1. Launch the development server using the following script
```bash
npm run dev
```

2. Open a new terminal window and run following script to launch the Firebase Local Emulator Suite

```bash
npm run emulators
```

### Testing

For testing purposes you only need to run the emulators. All the HTTP requests done by [Supertest](https://ladjs.github.io/superagent/#request-basics) will interact with the Firestore emulators directly. This means you don't have to run development server to run the (integration) tests.

You can run all the tests in the `__tests__` folder by running the following script:

```bash
npm run test
```

### Features

### Implemented 
- User authentication with [Firebase Authentication](https://firebase.google.com/docs/auth) using password and username


### Technologies used
- [Express](https://expressjs.com/)
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [TypeScript](https://www.typescriptlang.org/)
- [Vitest](https://vitest.dev/)
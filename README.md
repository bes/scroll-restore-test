# Scroll Restore Test

This is a Single Page Application that can be used to test scroll restoration in browsers.

## Dev

Use yarn to start the webpack dev server

```
cd app
yarn install # Run this only the first time, or when there are changes to package.json
yarn run dev
```

## Build

Gradle can be used to build the application

```
./gradlew app:webpackBuild
```

The app will be output to `./app/build/js`. To run this built version you can use e.g. http-server

```
npm install -g http-server
http-server app/build/js
```

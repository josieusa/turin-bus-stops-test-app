# Bus stops in the best city in the world

This is a test app. Don't use it.

# Prerequisites

* Node 8
* Postgres
  
 # Install
  
 1. `npm i`
 2. Import database backup from `postgres.backup`
 
 # Run

 1. `nodejs node_modules/swagger/bin/swagger.js project start test`
 2. Wait a few seconds
 3. Open `localhost:10010/public/login.html` in the browser
 4. Login using the username `admin` and the password `admin`

# Run Swagger editor

    nodejs node_modules/swagger/bin/swagger.js project start test
    
# Libraries used

    "dependencies": {
      "express": "^4.12.3",
      "googlemaps": "^1.12.0",
      "got": "^8.0.3",
      "knex": "^0.14.2",
      "pg": "^7.4.1",
      "swagger-express-mw": "^0.1.0"
    },
    "devDependencies": {
      "bootstrap": "^4.0.0",
      "browserify": "^15.2.0",
      "should": "^7.1.0",
      "supertest": "^1.0.0",
      "swagger": "^0.7.5",
      "swagger-editor": "^3.2.8",
      "yo-yo": "^1.4.1"
    }

The root `package.json` contains both the app dependencies and the Swagger dependencies. This was done in order to allow installing the app with a single `npm i` command.

# Description of main libraries

* Swagger: API framework
* Express: web application framework
* yo-yo: UI library with "real DOM" diffing
* Bootstrap: frontend HTML, CSS, and JS framework
* Knex: SQL query builder
* got: HTTP requests library

# Description of development

## Backend

This app was created starting from the API, using the command:

    nodejs node_modules/swagger/bin/swagger.js project start test

After that, I made as little modifications as possible to the app structure created by Swagger.

99,9% of the server-side modifications are contained in the folder `test/api/controllers` (`api/controllers` is the standard folder for Swagger controllers) and `test/api/swagger/swagger.yaml` (the Swagger app config).

Therefore, this is a plain, standard Swagger API.

The `public.js` controller, among other things, serves static files.

## Frontend

The front-end code is contained in the `public` folder. Everything in it is, oh well, public.

There is no frontend package manager.

All the frontend dependencies were copied by hand into the `public` folder and included by hand into `index.html`.
`yo-yo` was built using Browserify at development time, as described in its README (this is why it's in the development dependencies).

`index.js` is the main JavaScript frontend code, and it's a plain, almost standard yo-yo app.

# TODOs, caveats and weirdnesses

1. The login page has no graphics at all.
1. Only the file `index.html` is protected by login. All other files and API endpoints (including login, of course) are not.
1. The auth token is not secure at all, since it is the username in Base64 (cheap way to know the currently active username).
1. The server secret used for the verification of the authorization token is the same as the username. This allowed to use a mock implementation of the auth token verification. In order to implement this with a different server secret, you may use a HMAC.
1. CORS was enabled by default by Swagger, but it's not needed.
1. Columns have fixed height. The screen height must be at least 1024 pixels.
1. If you click `Next`, the app doesn't check if you reach the last page of the list of results.
1. The map is static.
1. Only query parameters were used in the REST routes in order not to conflict with the `public.js` Swagger controller, the only one which uses path parameters.
1. Docker is missing.

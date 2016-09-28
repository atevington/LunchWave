# LunchWave

A work in progress.

### Quick Start

```sh
# clone the repo
git clone https://github.com/atevington/LunchWave

# change directory to the app
cd LunchWave

# install the dependencies with npm
npm install
cd client
npm install

# add some test restaurants (optional)
node ./utility/recreatetestdata.js

# start just the Express server on port 3001
npm run server

# alternatively start both the API and Webpack servers
# note: all calls to /api/* will be proxied to 3001
npm run start
```

### Build the Client Application

```sh
cd client

# builds to client/public
# for now, you can copy its contents manually to the top level public directory
npm run build
```


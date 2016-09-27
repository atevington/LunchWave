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

# add some test restaurants (optional)
node .\utility\recreatetestdata.js

# start just the Express server on port 3001
npm run server

# start just the Webpack server on port 3000
npm run client

# alternatively start both the API and Webpack servers
# note: all calls to /api/* will be proxied to 3001
npm run start
```

### Explore the client application

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build the Client Application

```sh
npm install

npm run build

# see the built application in the public directory
ls public
```


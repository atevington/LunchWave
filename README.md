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

### Common tasks

```sh
# mark a user as an admin
node .\utility\dbadmin.js create administrator "{id: 'GOOGLE_ID' /* replace with Google profile id */}"

# un-flag a user as an admin
node .\utility\dbadmin.js destroy administrator "{where: {id: 'GOOGLE_ID' /* replace with Google profile id */}}"

# create a new restaurant
node .\utility\dbadmin.js create restaurant "{name: 'Restaurant Name', sunday: false /* mark true as needed for relevant day */, monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false}"

# set a menu image for a restaurant
node .\utility\dbadmin.js create restaurantImage "{restaurantId: 0 /* replace 0 with restaurant id */, url: 'https://domain.com/path/to/image.png'}"

# remove all menu images for a restaurant
node .\utility\dbadmin.js destroy restaurantImage "{where: {restaurantId: 0 /* replace 0 with restaurant id */}}"

# deactivate a restaurant
node .\utility\dbadmin.js update restaurant "{active: false}" "{where: {id: 0 /* replace 0 with restaurant id */}}"
```
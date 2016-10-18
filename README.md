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
npm run create-test-data

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

### Common tasks

```sh
# mark a user as an admin
npm run dbadmin create administrator "{id: 'GOOGLE_ID' /* replace with Google profile id */}"

# un-flag a user as an admin
npm run dbadmin destroy administrator "{where: {id: 'GOOGLE_ID' /* replace with Google profile id */}}"

# create a new restaurant
npm run dbadmin create restaurant "{name: 'Restaurant Name', sunday: false /* mark true as needed for relevant day */, monday: false, tuesday: false, wednesday: false, thursday: false, friday: false, saturday: false}"

# set a menu image for a restaurant
npm run dbadmin create restaurantImage "{restaurantId: 0 /* replace 0 with restaurant id */, url: 'https://domain.com/path/to/image.png'}"

# remove all menu images for a restaurant
npm run dbadmin destroy restaurantImage "{where: {restaurantId: 0 /* replace 0 with restaurant id */}}"

# deactivate a restaurant
npm run dbadmin update restaurant "{active: false}" "{where: {id: 0 /* replace 0 with restaurant id */}}"
```
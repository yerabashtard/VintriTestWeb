# Vintri Test Web

### Front end server used for displaying and rating beers!

## Quick notes
##### - Run npm install from the root directory to get all required packages.
##### - The src/api/config.js file should be updated to ensure the correct location of the Beer Server is configured before starting.
##### - The port that the server runs on can be changed using 'port' in the src/vue.config.js file.
##### - The server can be started using the 'npm run serve' command from the root directory.
##### - All testing was done using Chrome v109 on Mac OS 10.15.7. No attempt was made to be compatible with other browsers or provide a responsive experience for mobile.

## Other notes

### Vue Framework Creation
##### I used a startup package for Vue-cli since I'm new to the framework. I didn't go through every aspect of what was created so there could be some files/packages included which aren't being used.

### Incomplete Component
##### There's a RatingModal component that I wanted to use to pop up a nice modal for a user to submit ratings, but the modal was taking a bit longer than I thought to get going so it's only half complete. Instead the rating can be done inline on each beer item in the list.

## Code Review

##### src/component/BeerItem.vue - Would be a better user experience to use something like star icons that appear to fill up as you hover over them to submit a rating instead of using a radio selector.
##### src/component/BeerItem.vue - No visual indicator of createRating success or error displayed to user
##### src/App.vue - Email address should not be hardcoded
##### - CSS should be structured better. A lot of the values can be put into a global file and shared to maintain consistency in the look and feel of the UI.
##### - Forms being used twice in the front end to send basic data. There must be a better way than overriding submit in a single page application. Routing?
##### - Email is passed all the way down. Probably a good candidate for a global store.

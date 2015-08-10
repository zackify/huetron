Currently in progress, don't actually use this.

##Building

Until we package this up for release, running the app by doing:
`npm install electron-prebuilt -g`
`electron .`

###Adding node modules

~~~js
npm install --save-dev electron-rebuild

./node_modules/.bin/electron-rebuild
~~~

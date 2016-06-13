# electron-mini-youtube-player

This is a youtube player for Electron application.
**tested on only mac os**


**Mac OS**

![screenshot](mini-s-1.png)

![screenshot](mini-s-2.png)


Features
--------
- youtube api
- youtube search video
- html5 player
- app package


Getting Started
---------------
```bash
# Clone this repository
$ git clone https://github.com/gilhyun/electron-mini-youtube-player
# Go into the repository
$ cd electron-mini-youtube-player
# Install dependencies and run the app
$ npm install
$ node server.js
$ HOT=1 NODE_ENV=development ./node_modules/.bin/electron .
```

Edit api key /app/api/youtubeData.js
---------------
```bash
const youtubeKeys = [
  'YOUR_YOUTUBE_API_KEY'
]
```


Package app
---------------
```bash
NODE_ENV=production node package.js
```

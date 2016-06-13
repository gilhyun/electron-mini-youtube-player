'use strict';

const electron = require('electron');
const events = require('events');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;
const globalShortcut = electron.globalShortcut;
const clipboard = electron.clipboard;
const jsonfile = require('jsonfile');
const getYoutubeUrl = require('youtube-url');
const appConfig = require('./user-data/appConfig.json');
const userGuide = require('./user-data/userGuide.json');
const lastPlayerSize = process.env.HOT ? require('./user-data/playerSize.development.json') : require('./user-data/playerSize.production.json');

electron.crashReporter.start();

let guideWindow = null;
let playerWindow = null;
let playListWindow = null;
let youtubeWindow = null;
let trayIcon = null;
let onlineStatusWindow = null;

let indexFile = process.env.HOT ? 'index-dev' : 'index';
let playerWidth = lastPlayerSize.width;   // 412
let playerHeight = lastPlayerSize.height; // 232
let playerFullScreen = null;

// ---
// app
//

var mini = new events.EventEmitter();
mini.app = app;

app.on('window-all-closed', function() {
  app.quit();
});

app.on('will-quit', function() {
  if (globalShortcut.isRegistered(appConfig.hotKeyTogglePlayer)) {
    globalShortcut.unregister(appConfig.hotKeyTogglePlayer); // 단축키의 등록을 해제 한다.
  }
});

const appBootStrap = function() {
  mini.setPlayListWindow(); // 메인 윈도우.
  mini.setHotKey(); // 단축키.
  mini.setIpcMain(); // ipc 통신.
};

app.on('ready', appBootStrap);



// ---
// Windows.
//

mini.setPlayListWindow = function() {
  playListWindow = new BrowserWindow({
    width             : 928,
    height            : 605,
    show              : true,
    frame             : true,
    titleBarStyle     : 'hidden-inset',
    resizable         : true,
    fullscreen        : false
  });

  playListWindow.loadURL('file://' + __dirname + '/app/' + indexFile + '.html#/playlist');

  // playListWindow.setAlwaysOnTop(true);

  playListWindow.on('focus', function() {
    var checkeVideo = mini.clipboardChecke();
    if (checkeVideo) playListWindow.webContents.send('클립보드-발견', mini.clipboardChecke());

    playListWindow.webContents.send('검색박스-포커스', 1);
  });

  playListWindow.on('closed', function() {
    playListWindow = null;
  });

  playListWindow.webContents.on('did-finish-load', function() {
    playListWindow.webContents.send('dispatch-playlist-to-playlist', 1);
  });
};

mini.setPlayerWindow = function() {
  playerWindow = new BrowserWindow({
    width             : playerWidth,
    height            : playerHeight,
    show              : true,
    frame             : false,
    // darkTheme         : true,
    resizable         : appConfig.playerResizable,
    acceptFirstMouse  : true
  });

  playerWindow.loadURL('file://' + __dirname + '/app/' + indexFile + '.html#/');

  if (appConfig.aspectRatio == '16/9') {
    playerWindow.setAspectRatio(16/9, [ 0, 0 ]);
  } else {
    playerWindow.setAspectRatio(4/3, [ 0, 0 ]);
  };

  // playerWindow.setAlwaysOnTop(true);

  playerWindow.on('resize', function() {
    mini.playerLastSize(); // 플레이어 사이즈 저장.
  });

  playerWindow.on('moved', function() {
    mini.playerLastSize(); // 플레이어 사이즈 저장.
  });

  playerWindow.on('restore', function() {
    playerWindow.hide(); // 최소창에서 돌아오면 화면이 안보인다. _-_;
    playerWindow.show(); // 뭐 이런 버그가..
  });

  // playerWindow.on('enter-full-screen', function() {});

  playerWindow.on('leave-full-screen', function() {
    playerWindow.show();
    playerFullScreen = false;
  });

  playerWindow.on('closed', function() {
    playerWindow = null;
  });

  playerWindow.webContents.on('did-finish-load', function() {
    if (onlineStatusWindow == null) mini.setOnlineStatusCheckerWindow();
    onlineStatusWindow.webContents.send('check-online-status', function(){})
  });
};

mini.setOnlineStatusCheckerWindow = function() {
  onlineStatusWindow = new BrowserWindow({
    width   : 0,
    height  : 0,
    show    : false
  });

  onlineStatusWindow.loadURL('file://' + __dirname + '/app/online-status.html');

  onlineStatusWindow.on('closed', function() {
    onlineStatusWindow = null;
  });
};




// ---
// Functions.
//

mini.setHotKey = function() {
  var ret = globalShortcut.register(appConfig.hotKeyTogglePlayer, function() {
    mini.togglePlayerWindow();
  });

  if (!ret) console.log(appConfig.hotKeyTogglePlayer + ' 등록 실패');
  if (globalShortcut.isRegistered(appConfig.hotKeyTogglePlayer)) {
    console.log('단축키 ' + appConfig.hotKeyTogglePlayer + ' 가 등록 되었습니다.');
  }
};

mini.togglePlayerWindow = function(state) {
  if (!playerWindow) return mini.setPlayerWindow();
  if (state != 'show' && playerWindow && playerWindow.isVisible()) {
    playerWindow.hide();
    mini.emit('playerHide');
    return;
  };
  playerWindow.show();
};

mini.showPlayListWindow = function() {
  if (!playListWindow) mini.setPlayListWindow();
  playListWindow.show();
};

mini.clipboardChecke = function() {
  return getYoutubeUrl.extractId(clipboard.readText());
};

mini.playerLastSize = function() {
  // TODO: 위치저장.

  console.log(playerWindow.getBounds());

  if (playerWindow.isFullScreen() === false) {
    const file = process.env.HOT ? './user-data/playerSize.development.json' : './user-data/playerSize.production.json';
    const newSize = {
      width: playerWindow.getSize()[0],
      height: playerWindow.getSize()[1]
    };

    jsonfile.writeFile(file, newSize, function (err) {
      if(err) return console.error(err);
    });

    playerWidth = playerWindow.getSize()[0];
    playerHeight = playerWindow.getSize()[1];
  }
};

mini.setIpcMain = function() {
  ipcMain.on('ready-player', function(event) {
    mini.emit('readyPlayer');
  });

  ipcMain.on('show-controller', function(event, state) {
    playerWindow.webContents.send('show-controller-to-player', state);
  });

  ipcMain.on('close-player', function(event) {
    playerWindow.close();
    if (onlineStatusWindow) onlineStatusWindow.close();
  });

  ipcMain.on('minimize-player', function(event) {
    playerWindow.minimize();
  });

  ipcMain.on('fullscreen-player', function(event) {
    var f = playerWindow.isFullScreen();
    if (f) playerFullScreen = true;
    playerWindow.setFullScreen(f ? false : true);
  });

  ipcMain.on('always-on-top-player', function(event) {
    var t = playerWindow.isAlwaysOnTop();
    playerWindow.setAlwaysOnTop(t ? false : true);
  });

  ipcMain.on('play-video', function(event, videoIndex) {
    var sender = function(){
      playerWindow.webContents.send('play-video-to-player', videoIndex);
    };

    if (!playerWindow) {
      mini.setPlayerWindow();
      mini.once('readyPlayer', sender);
      return;
    }

    mini.togglePlayerWindow('show');
    sender();
  });

  ipcMain.on('open-playlist', function(event) {
    mini.showPlayListWindow();
  });

  ipcMain.on('refresh-playlist', function(event, status) {
    playListWindow.webContents.send('dispatch-playlist-to-playlist', status);
  });

  ipcMain.on('change-online-status', function(event, status) {
    if (status == 'offline' && playerWindow) {
      playerWindow.webContents.send('offline', status);
    } else {
      playerWindow.webContents.send('online', status);
    }
  });
};

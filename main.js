var app = require('app')
var Hue = require('./hue')
var Tray = require('tray')
var globalShortcut = require('global-shortcut');

var hue = Hue()
app.on('ready', function() {
  appIcon = new Tray('./icon.png');
  hue.renderMenu()
  globalShortcut.register('cmd+h', function() {
    hue.allLights()
  })
})

app.dock.hide()

var app = require('app')
var Hue = require('./hue')
var Tray = require('tray')

var hue = Hue()
app.on('ready', function() {
  appIcon = new Tray('./icon.png');
  hue.renderMenu()
})

app.dock.hide()

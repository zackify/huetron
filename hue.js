var Menu = require('menu');
var request = require('superagent')
var ip = '192.168.1.3'

module.exports = function(){
  var hue = {
    state: {
      isOn: {}
    },
    renderMenu: function(){
      var self = this
      request
      .get('http://'+ip+'/api/newdeveloper/lights')
      .end(function(err, response){
        self.state.all = false
        var lights = []
        for(var light in response.body){
          lights.push(light)
          console.log(light, response.body[light].state.on)
          self.state.isOn[light] = response.body[light].state.on
        }
        self.state.lights = lights
        self.reload()
      })

    },

    allLights: function(){
      var self = this
      request
      .put('http://'+ip+'/api/newdeveloper/groups/0/action')
      .send({"on": !this.state.all})
      .set('Accept', 'application/json')
      .end(function(err,response){
        if(!err) self.state.all = !self.state.all
        for(var light in self.state.isOn){
          self.state.isOn[light] = self.state.all
        }
        self.reload()
      })
      return this
    },

    light: function(light){
      var self = this
      request
      .put('http://'+ip+'/api/newdeveloper/lights/'+light+'/state')
      .send({"on": !this.state.isOn[light]})
      .set('Accept', 'application/json')
      .end(function(err,response){
        if(!err) self.state.isOn[light] = !self.state.isOn[light]
        self.reload()
      })
      return this
    },

    reload: function(){
      var labels = []

      labels.push({
        label: this.state.all ? 'Turn All Off' : 'Turn All On',
        click: this.allLights.bind(this)
      })
      var self = this

      for(var light in this.state.lights){
        var number = this.state.lights[light]
        labels.push({
          label: self.state.isOn[number] ? 'Turn '+number+' Off' : 'Turn '+number+' On',
          click: self.light.bind(self,number)
        })
      }
      var contextMenu = Menu.buildFromTemplate(labels);
      appIcon.setToolTip('Control your Hue lights');
      appIcon.setContextMenu(contextMenu);

      return this
    }
  }
  return hue
}

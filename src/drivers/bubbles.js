SSBXBase.Drivers.Bubbles = Class.create({
  initialize: function() {
    if (SSBXBase.Debug) {
      SSB.console.init('info');
    }
  },
  
  notify: function(message, title, unique_id) {
    /* concat these until there's something more intelligent I can do with Bubbles */
    var text = title + ' ' + message;
    return SSB.simpleNotify(text);
  },
  
  log: function(message) {
    SSB.console.debug(message);
  }
});
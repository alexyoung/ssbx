SSBXBase.Drivers.Bubbles = Class.create({
  initialize: function() {
    if (SSBXBase.Debug) {
      SSB.console.init('info');
    }
  },
  
  /* Options: message, title, unique_id */
  notify: function(options) {
    /* concat these until there's something more intelligent I can do with Bubbles */
    var text = options['title'] + ' ' + options['message'];
    return SSB.simpleNotify(text);
  },
  
  log: function(message) {
    SSB.console.debug(message);
  }
});
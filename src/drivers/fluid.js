SSBXBase.Drivers.Fluid = Class.create({
  initialize: function() {
  },
  
  /* Options: message, title, unique_id */
  notify: function(options) {
    window.fluid.showGrowlNotification({
        title: options['title'],
        description: options['message'],
        priority: 1,
        sticky: false,
        identifier: options['unique_id']
    });
  },
  
  setDockBadge: function(count) {
    window.fluid.dockBadge = count;
  },
  
  log: function(message) {
    window.console.log(message)
  }
});
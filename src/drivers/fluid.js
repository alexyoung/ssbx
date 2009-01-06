SSBXBase.Drivers.Fluid = Class.create({
  initialize: function() {
  },
  
  notify: function(message, title, unique_id) {
    window.fluid.showGrowlNotification({
        title: title, 
        description: message, 
        priority: 1, 
        sticky: false,
        identifier: unique_id
    });
  },
  
  setDockBadge: function(count) {
    window.fluid.dockBadge = count;
  },
  
  log: function(message) {
    window.console.log(message)
  }
});
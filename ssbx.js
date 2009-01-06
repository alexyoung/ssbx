/* START ssbx.js */
var SSBXBase = {
  Version: '0.1',
  Debug: true,
  CookieName: 'ssbx_cookies',
  
  Supported: {
    Fluid:   !!(window.fluid),
    Bubbles: !!(typeof(SSB) != 'undefined')
  },
  
  API: {},
  Internal: {},
  Drivers: {}
};

SSBXBase.Internal = {
  Cookies: {},
  
  findDriver: function() {
    var ssb = $H(SSBXBase.Supported).find(function(ssb) {
      return ssb[1]
    })
    
    if (ssb) {
      return ssb[0]
    }
  },
  
  logNotification: function(unique_id) {
    // Log message to cookie
    var cookie = this.Cookies.find(SSBXBase.CookieName);
    
    if (Object.isUndefined(cookie)) {
      cookie = unique_id;
    } else {
      cookie = cookie + ',' + unique_id;
    }
    
    this.Cookies.save(SSBXBase.CookieName, cookie, 365);
  },
  
  displayedNotification: function(unique_id) {
    var cookie = this.Cookies.find(SSBXBase.CookieName)
    unique_id = parseInt(unique_id)
    
    if (Object.isUndefined(cookie)) {
      return false
    }
    
    var unique_ids = $A(cookie.split(','))
    
    return unique_ids.find(function(logged_id) {
      if (parseInt(logged_id) == unique_id) {
        return true
      }
    })
  },
  
  // Logging uses console.log by default
  log: function(message) {
    console.log(message)
  }
};

SSBXBase.API = Class.create({
  initialize: function() {
    this.internal = SSBXBase.Internal;
    var delegate = this.internal.findDriver();
    
    if (delegate) {
      this.delegate = eval('new SSBXBase.Drivers.' + delegate);
      
      // Intended for the public interface
      this.availableDriver = delegate;
    }
  },
  
  isAvailable: function() {
    return !!this.delegate;
  },
  
  run: function(callback) {
    if (this.isAvailable()) {
      callback()
    }
  },
  
  // Only impleemnt the notify method
  notifyOnce: function(unique_id, message, title) {
    // Display if it hasn't been logged
    if (!this.internal.displayedNotification(unique_id)) {
      // Log the message
      this.internal.logNotification(unique_id);

      return this.delegate.notify(message, title, unique_id);
    }
  },
  
  // Implement these methods to add drivers in SSBXBase.Drivers.YourDriver
  notify: function(message, title, unique_id) {
    return this.delegate.notify(message, title, unique_id);
  },
  
  setDockBadge: function(count) {
    return this.delegate.setDockBadge ? this.delegate.setDockBadge(count) : false
  },
  
  // Logging only gets run when Debug is set to true
  log: function(message) {
    if (SSBXBase.Debug) {
      return this.delegate.log ? this.delegate.log(message) : SSBXBase.Internal.log(message)
    }
  }
});

// Create the public SSBX API object
document.observe('dom:loaded', function() {
  SSBX = new SSBXBase.API;
});


/* END ssbx.js */
/* START fluid.js */
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
/* END fluid.js */
/* START bubbles.js */
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
/* END bubbles.js */
/* START cookies.js */
SSBXBase.Internal.Cookies = {
  save: function(name, value, days, path) {
    var expires = '';
    path = typeof path == 'undefined' ? '/' : path;
    
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toGMTString();
    }

    if (name && value) {
      document.cookie = name + '=' + escape(value) + expires + '; path=' + path;
    }
  },
  
  find: function(name) {
    var matches = document.cookie.match(name + '=([^;]*)');

    if (matches && matches.length == 2) {
      return unescape(matches[1]);
    }
  },
  
  destroy: function(name) {
    this.save(name, ' ', -1);
  }
};
/* END cookies.js */

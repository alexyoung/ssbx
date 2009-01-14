var notificationTests = {
  setup: function() {
  },
  
  teardown: function() {
    SSBXBase.Internal.Cookies.destroy(SSBXBase.CookieName)
  },
  
  testNotify: function() {
    SSBX.notify('This is a message', 'Hello')
  },
  
  testNotifyOnce: function() { with(this) {
    SSBX.notifyOnce(1, 'This should be displayed once', 'Hello Once')
    wait(1000, function() {
      SSBX.notifyOnce(1, 'This should be displayed once', 'Hello Once')
    })
  }}
}

var notificationTests = {
  setup: function() {
  },
  
  teardown: function() {
    SSBXBase.Internal.Cookies.destroy(SSBXBase.CookieName)
  },
  
  testNotify: function() {
    SSBX.notify({ message: 'This is a message', title: 'Hello' })
  },
  
  testNotifyOnce: function() { with(this) {
    SSBX.notifyOnce({ unique_id: 1, message: 'This should be displayed once', title: 'Hello Once' })
    wait(1000, function() {
      SSBX.notifyOnce({ unique_id: 1, message: 'This should be displayed once', title: 'Hello Once' })
    })
  }}
}

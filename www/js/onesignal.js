document.addEventListener('deviceready', function () {
  window.plugins.OneSignal
    .startInit('c5518440-c407-4d1d-8105-6bcc6c4a41c8')
    .handleNotificationOpened(function(jsonData) {
      var mensagem = JSON.parse(JSON.stringify(jsonData['notification']['payload']['body']));

      ons.notification.alert(
        mensagem,
        {title: 'Ola!'}
      );
    })
    .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
    .endInit();
}, false);
document.addEventListener('deviceready', function () {
  window.plugins.OneSignal
    .startInit('d1797b39-26de-46b8-86ec-9539f8aabf2d')
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
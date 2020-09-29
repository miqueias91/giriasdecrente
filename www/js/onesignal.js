document.addEventListener('deviceready', function () {
  window.plugins.OneSignal
    .startInit('1305f998-98d2-4b38-9a9a-a27436f5dbbb')
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
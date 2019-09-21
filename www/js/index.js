var admobid = {}
if (/(android)/i.test(navigator.userAgent)) {  // for android & amazon-fireos
  admobid = {
    banner: 'ca-app-pub-7091486462236476/9500431400',
    interstitial: 'ca-app-pub-7091486462236476/3962547158',
  }
} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {  // for ios
  admobid = {
    banner: 'ca-app-pub-7091486462236476/9500431400',
    interstitial: 'ca-app-pub-7091486462236476/3962547158',
  }
}
  alert("aqui")

document.addEventListener('deviceready', function() {
  admob.banner.config({
    id: admobid.banner,
    isTesting: true,
    autoShow: true,
  })
  admob.banner.prepare()

  admob.interstitial.config({
    id: admobid.interstitial,
    isTesting: true,
    autoShow: true,
  })
  admob.interstitial.prepare()

  document.getElementById('showAd').disabled = true
  document.getElementById('showAd').onclick = function() {
    admob.interstitial.show()
  }

  alert("deviceready")

}, false)

document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {
  console.log(event)
})

document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
  console.log(event)
})

document.addEventListener('admob.interstitial.events.LOAD', function(event) {
  console.log(event)
  document.getElementById('showAd').disabled = false
})

document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
  console.log(event)

  admob.interstitial.prepare()
})
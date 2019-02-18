// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js


angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services',
                         'app.directives', 'ngCordova', 'ui.select', 'ngSanitize'])
    .run(function($ionicPlatform, $rootScope, $state) {
        $ionicPlatform.ready(function() {
            if(window.localStorage.getItem('doctor_id') &&
                JSON.parse(window.localStorage.getItem('docuser')).token){
                $state.go("menu.home");
            }
            else{
                window.localStorage.clear();
                $state.go("login");
            }

            window.plugins.OneSignal.addSubscriptionObserver(function (state) {
              if (!state.from.subscribed && state.to.subscribed) {
                console.log("Subscribed for OneSignal push notifications!")
                // get player ID
                state.to.userId
              }
              console.log("Push Subscription state changed: " + JSON.stringify(state));
            });
            var notificationOpenedCallback = function (jsonData) 
            {
                         alert(JSON.stringify(jsonData.notification["payload"].body));
                         console.log("open notification",jsonData);
                    if((jsonData["notification"]["payload"]["additionalData"].type) == "call_request")
                    {
                        $state.go('callNotification', { call: jsonData["notification"]["payload"]["additionalData"]})
                    }else if ((jsonData["notification"]["payload"]["additionalData"].type) == "call_payment_done")
                    {
                        alert("payment done and wait calling")
                    }else if ((jsonData["notification"]["payload"]["additionalData"].type) == "call_payment_not_done")
                    {
                        alert("call cancelled");
                    }else if ((jsonData["notification"]["payload"]["additionalData"].type) == "home_visit_end_doc")
                    {
                        $state.go('endvisit',{ visit: jsonData["notification"]["payload"]["additionalData"]})
                    }else if ((jsonData["notification"]["payload"]["additionalData"].type) == "home_visit_request_doc")
                    {
                        $state.go('notification',{ visit: jsonData["notification"]["payload"]["additionalData"]})
                    }
                    else if ((jsonData["notification"]["payload"]["additionalData"].type) == "home_visit_pay_success_doc")
                    {
                       $state.go('patientlocationmap',{ visit: jsonData["notification"]["payload"]["additionalData"]})
                    }
                    else if ((jsonData["notification"]["payload"]["additionalData"].type) == "home_visit_pay_failed_doc")
                    {
                        alert("home visit didn't complete");
                    }
                    else{
                      console.log("false");
                    }
             }

            var notificationReceivedCallback = function (jsonData)
             {
                    console.log("closed notification",JSON.stringify(jsonData));
             };

          window.plugins.OneSignal.getIds(function(userDetails) 
              {
                    window.localStorage.setItem('device_id',userDetails.userId)
                        console.log(userDetails.userId); // Player ID
                        console.log(userDetails.pushToken);
                })

            window.plugins.OneSignal.startInit("3eb382ee-0bab-4011-bf16-cc345a94b7c1")
            .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
            .handleNotificationReceived(notificationReceivedCallback)
            .handleNotificationOpened(notificationOpenedCallback)
            .endInit();


            $rootScope.url = "https://kashf247.com/";
            // $rootScope.url = "http://dev.kashfapp.zadsolutions.com/";
            $rootScope.base_url = $rootScope.url;

            // Hide the accessory bar by default 
            // (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
            }
        });
    });

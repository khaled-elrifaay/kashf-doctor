// angular.module('app.services')
//         .service('notificationService', ['WebService', 'configService', '$state', function (WebService, configService, $state) {
//                 var mainScope = this;
//                 this.GetNotifyLocalDB = function () {
//                     var data = window.localStorage.getItem('notification');
//                     return (data !== null && data != 'undefined') ? JSON.parse(data) : null;
//                 };
//                 this.GetNotifyVerLocalDB = function () {
//                     var data = window.localStorage.getItem('notificationVer');
//                     return (data !== null && data != 'undefined') ? JSON.parse(data) : -1;
//                 };
//                 this.DeleteNotifyLocalDB = function () {
//                     window.localStorage.removeItem('notificationVer');
//                     window.localStorage.removeItem('notification');
//                 };


//                 this.DeleteNotifyById = function (index) {
//                     var obj = mainScope.GetNotifyLocalDB();
//                     obj.splice(index, 1);
//                     window.localStorage.removeItem('notification');
//                     window.localStorage.setItem('notification', JSON.stringify(obj));
//                 };

//                 this.DeleteNotifyByServerId = function (index) {
//                     var obj = mainScope.GetNotifyLocalDB();
//                     for (var i = 0; i < obj.length; i++)
//                     {
//                         if (obj[i].notification_id == index)
//                         {
//                             obj.splice(i, 1);
//                             i = obj.length + 10;
//                         }
//                     }
//                     window.localStorage.removeItem('notification');
//                     window.localStorage.setItem('notification', JSON.stringify(obj));
//                 };

//                 this.notifyService = function (notification) {
//                     var NotAction = function (data) {
//                         var val = JSON.parse(data);
//                         if (val.message_type == '1') {
//                             window.sessionStorage.setItem('long', val.longitude);
//                             window.sessionStorage.setItem('lat', val.latitude);
//                             $state.go("notification", {visit: JSON.stringify(val)});
//                         } else {
//                             var notID = val.notification_id;
//                             mainScope.DeleteNotifyByServerId(notID);
//                             $state.go("menu.home", {visit: val});
//                             var notification_data = $.param(
//                                     {
//                                         'notification_id': val.notification_id,
//                                     });
//                             WebService.wepServiceConnector(notification_data, "postSeenNotification", false).then(function (result) {
//                                 //var data = result.result;
//                                 //$state.go("menu.home", {visit: data});
//                                 //mainScope.statusValue(true);
//                             });

//                         }
//                     }
//                     // action of call notification 
//                     var CallNotAction = function (data) {
//                         console.log("noatification : " + data);
//                         var val = JSON.parse(data);
//                         console.log("noatification : " + data);
//                         if (val.message_type == 6) {

//                             $state.go("callNotification", {call: data});
//                         } else if (val.message_type == 5) {
//                             console.log("enter in 5")
//                             $state.go("callReport", {call: val});
//                         } else {
//                             var notID = val.notification_id;
//                             mainScope.DeleteNotifyByServerId(notID);
//                             $state.go("menu.home", {visit: val});
//                             var notification_data = $.param(
//                                     {
//                                         'notification_id': val.notification_id,
//                                     });
//                             WebService.wepServiceConnector(notification_data, "postSeenNotification", false).then(function (result) {
// //                                var data = result.result;
// //                                $state.go("menu.home", {visit: data});
// //                                mainScope.statusValue(true);
//                             });

//                         }
//                     }

//                     notification.forEach(function (entry) {
//                         var data = entry;
//                         var idaudio = Math.round(Math.random() * 10000);

//                         if (data.valid == "1")
//                         {
//                             if (data.message_type == 1) {

//                                 var dataOne = data;
//                                 var alarmTime = new Date();
//                                 alarmTime.setMinutes(alarmTime.getMinutes());

//                                 cordova.plugins.notification.local.schedule({
//                                     id: 1,
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: "Touch to View.",
//                                     title: "Patient Visit Request",
//                                     foreground: true,
//                                     icon: "/img/icon.png",
//                                     data: dataOne,
//                                 });
//                                 var buttonTimer = setTimeout(function(){
//                                     var Visitdata = $.param(
//                                         {
//                                             'visit_id': data.visit_id,
//                                             'notification_id': data.notification_id,


//                                         });
//                                     WebService.wepServiceConnector(Visitdata, "doctorVisitNoresponse", false).then(function (result) {
//                                         cordova.plugins.notification.local.cancelAll(function() {
// //                                            alert ("done");
//                                         }, this);
//                                         alert("The Last Request expired, as it was not answered in due time from your side");
//                                         $state.go("menu.home");
//                                      });
//                                      NotAction(data);

//                                 }, 600000);
//                                 cordova.plugins.notification.local.on("click", function (notification) {
//                                     NotAction(notification.data);
//                                     clearTimeout(buttonTimer);
//                                     // notification.data();
//                                 });



//                             } else if (data.message_type == 6) {
//                                 var dataOne = data;
//                                 var alarmTime = new Date();
//                                 alarmTime.setMinutes(alarmTime.getMinutes());
//                                 cordova.plugins.notification.local.schedule({
//                                     id: idaudio,
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: "Touch to View.",
//                                     title: "Patient call Request",
//                                     foreground: true,
//                                     icon: "/img/icon.png",
//                                     data: dataOne,
//                                 });
//                                 var buttonTimer = setTimeout(function(){
//                                     var calldata = $.param(
//                                         {
//                                             'call_id': data.call_id,
//                                             'notification_id': data.notification_id,


//                                         });
//                                     WebService.wepServiceConnector(calldata, "doctorCallNoresponse", false).then(function (result) {
//                                         cordova.plugins.notification.local.cancelAll(function() {
// //                                            alert ("done");
//                                         }, this);
//                                         alert("The Last Request expired, as it was not answered in due time from your side");
//                                         CallNotAction(data);
//                                         $state.go("menu.home");
//                                      });

//                                 }, 600000);
//                                 cordova.plugins.notification.local.on("click", function (callNotification) {
//                                    clearTimeout(buttonTimer);
//                                     CallNotAction(callNotification.data);
//                                     // notification.data();
//                                 });
//                             } else if (data.message_type == 5) {
//                                 console.log("notification:" + data)
//                                 var dataOne = data;
//                                 var alarmTime = new Date();
//                                 alarmTime.setMinutes(alarmTime.getMinutes());

//                                 cordova.plugins.notification.local.schedule({
//                                     id: idaudio,
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: data.NotificationTitle,
//                                     title: data.NotificationMessage,
//                                     foreground: true,
//                                     icon: "/img/icon.png",
//                                     data: dataOne,
//                                 });
//                                 cordova.plugins.notification.local.on("click", function (callNotification) {
//                                     CallNotAction(callNotification.data);
//                                     // notification.data();
//                                 });
//                             } else if (data.message_type == 3) {
//                                 var dataTwo = data;
//                                 mainScope.initialstatus = false;

//                                 var alarmTime = new Date();
//                                 alarmTime.setMinutes(alarmTime.getMinutes());
//                                 cordova.plugins.notification.local.schedule({
//                                     id: idaudio,
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: "Touch to View.",
//                                     title: "you not paid your visits ",
//                                     foreground: true,
//                                     icon: "/img/icon.png"

//                                 });

//                             } else if ((data.message_type == 4))
//                             {
//                                 window.localStorage.removeItem('doctor_id');
//                                 alert("your account is not active please contact admin");
//                                 window.localStorage.removeItem('doctor_id');
//                                 window.localStorage.clear();
//                                 $state.go('login');
//                             } else if (data.message_type == 7) {
//                                 console.log("notification:" + data)
//                                 var dataOne = data;
//                                 var alarmTime = new Date();
//                                 alarmTime.setMinutes(alarmTime.getMinutes());

//                                 cordova.plugins.notification.local.schedule({
//                                     id: idaudio,
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: "Patient can't pay call fees so call canceled",
//                                     title: "Call Canceled",
//                                     foreground: true,
//                                     icon: "/img/icon.png",
//                                     data: dataOne,
//                                 });
//                                 cordova.plugins.notification.local.on("click", function (callNotification) {
//                                     CallNotAction(callNotification.data);
//                                     // notification.data();
//                                 });
//                             } else if (data.message_type == 8) {
//                                 console.log("notification:" + data)
//                                 var dataOne = data;
//                                 var alarmTime = new Date();
//                                 alarmTime.setMinutes(alarmTime.getMinutes());

//                                 cordova.plugins.notification.local.schedule({
//                                     id: idaudio,
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: "The transaction was successfully completed, the call center was notified.",
//                                     title: "The Call Paied",
//                                     foreground: true,
//                                     icon: "/img/icon.png",
//                                     data: dataOne,
//                                 });
//                                 cordova.plugins.notification.local.on("click", function (callNotification) {
//                                     CallNotAction(callNotification.data);
//                                     // notification.data();
//                                 });
//                             } else if (data.message_type == 10) {

//                                 var dataOne = data;
//                                 var alarmTime = new Date();
//                                 alarmTime.setMinutes(alarmTime.getMinutes());

//                                 cordova.plugins.notification.local.schedule({
//                                     id: idaudio,
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: "Touch to View.",
//                                     title: "Patient can't pay this visit so request canceld ",
//                                     foreground: true,
//                                     icon: "/img/icon.png",
//                                     data: dataOne,
//                                 });
//                                 cordova.plugins.notification.local.on("click", function (notification) {
//                                     NotAction(notification.data);
//                                     $state.go("menu.home");
//                                 });



//                             }else if (data.message_type == 12) {

//                                 var dataOne = data;
//                                 var alarmTime = new Date();
//                                 alarmTime.setMinutes(alarmTime.getMinutes());

//                                 cordova.plugins.notification.local.schedule({
//                                     id: idaudio,
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: "Touch to View.",
//                                     title: "The last request expired, as it wasn’t processed in due time from patient side",
//                                     foreground: true,
//                                     icon: "/img/icon.png",
//                                     data: dataOne,
//                                 });
//                                 cordova.plugins.notification.local.on("click", function (notification) {
//                                     NotAction(notification.data);
// //                                    alert("The last request expired, as it wasn’t processed in due time from patient side");
//                                     $state.go("noResponse");
//                                 });



//                             }else if (data.message_type == 11) {

//                                 var dataOne = data;
//                                 var alarmTime = new Date();
//                                 alarmTime.setMinutes(alarmTime.getMinutes());

//                                 cordova.plugins.notification.local.schedule({
//                                     id: idaudio,
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: "Touch to View.",
//                                     title: "The visit was successfully paid, please proceed",
//                                     foreground: true,
//                                     icon: "/img/icon.png",
//                                     data: dataOne,
//                                 });
//                                 cordova.plugins.notification.local.on("click", function (notification) {
//                                     NotAction(notification.data);
// //                                    var data=notification.data;
                                   
                                   
//                                     var visitDetails = {
//                                         'patient_name': data.patient_name,
//                                         'gender': data.gender,
//                                         'mobile': data.mobile,
//                                         'address': window.sessionStorage.getItem('patient_address'),
//                                         'payment': data.payment
//                                     };
//                                     $state.go('patientlocationmap', {visit_id: data.call_id, visit: visitDetails});

//                                 });



//                             } else
//                             {
//                                 var dataThree = data;
//                                 var alarmTime = new Date();
//                                 alarmTime.setMinutes(alarmTime.getMinutes());
//                                 cordova.plugins.notification.local.schedule({
//                                     id: idaudio,
//                                     trigger: {in: 5, unit: 'second'},
//                                     text: "Touch to View.",
//                                     title: "Patient Had Canceled His Visit Request",
//                                     foreground: true,
//                                     icon: "/img/icon.png",
//                                     data: dataThree,
//                                 });
//                                 cordova.plugins.notification.local.on("click", function (notification) {
//                                     NotAction(notification.data);
//                                 });
//                             }


//                         }
//                     }
//                     );
//                 };
//                 this.UpdateNotifyLocalDB = function (notification) {
//                     if (notification.notificationVer != 'undefined' || notification.notificationVer != null) {
//                         window.localStorage.setItem('notificationVer', notification.notificationVer);
//                     }
//                     var newnotify = null;
//                     if (mainScope.GetNotifyLocalDB() === null)
//                     {
//                         newnotify = notification.notification;
//                     } else
//                     {
//                         var obj = mainScope.GetNotifyLocalDB();
//                         var newObj = notification.notification
//                         newObj.forEach(function (entry) {
//                             obj.push(entry);
//                         });
//                         obj.concat(notification.notification);
//                         newnotify = obj;

//                     }
//                     window.localStorage.setItem('notification', JSON.stringify(newnotify));
//                     mainScope.notifyService(notification.notification);

//                 };

//                 this.GetNotifyFromServer = function () {
//                     var data = $.param({
//                         'notify': mainScope.GetNotifyVerLocalDB(),
//                         'doctor_id': window.localStorage.getItem('doctor_id'),
//                     });
//                     if (configService.getNotifyLock() != false) {
//                         configService.setNotifyLock(false);
//                         WebService.wepServiceConnector(data, "getNotificationMenu", false).then(function (result) {
//                             mainScope.UpdateNotifyLocalDB(result);
//                         });
//                     }
//                 };
//             }]);
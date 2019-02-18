angular.module('app.controllers')
        .controller('callNotificationCtrl', function ($scope, backButton, $stateParams, $state, $ionicPlatform, WebService,$http,$ionicHistory) {
            $scope.$on("$ionicView.beforeEnter", function () {
                $ionicHistory.clearCache();
            });
            $scope.$on("$ionicView.enter", function (event, data) {
                backButton.GetSpecLocalDB(501, false, true, false);
//                     $scope.call = $stateParams.call;
                if (typeof $stateParams.call === "object") {
                    $scope.call         =    $stateParams.call;
                    $scope.patient_name =    $scope.call.name;
                    $scope.gender       =    $scope.call.gender;
                    $scope.create_time  =    $scope.call.create_time;
                    $scope.payment      =    $scope.call.payment;
                    console.log("khaled",$scope.call)
                } else {
                    $scope.call = JSON.parse($stateParams.call);
                    console.log("khaled",$scope.call)
                }
                var buttonTimer = setTimeout(function(){
                    var data = $.param(
                        {
                            'call_id': $scope.call.call_id,
                            'notification_id': $scope.call.notification_id,
                        });
                    WebService.wepServiceConnector(data, "doctorCallNoresponse", false).then(function (result) {
                        alert("The Last Request expired, as it was not answered in due time from your side");
                        $state.go("menu.home");
                     });
                    
                }, 600000);

                $scope.acceptCall = function () {
                    clearTimeout(buttonTimer);
                    console.log("Call notification : ", $scope.call);
//                     $('#acceptCallButton').attr('disabled','disabled');
                    var notID = $scope.call.notification_id;
                    
                    var data = $.param({
                        'call_id': $scope.call.call_id,
                        'notification': $scope.call.notification_id,
                        'notification_id': $scope.call.notification_id,
                        'doctor_mobile': window.localStorage.getItem('user_mobile'),
                        'doctor_id': window.localStorage.getItem('doctor_id')
                    });

                    WebService.wepServiceConnector(data, "postCallAccept", false).then(function (result) {
                       // notificationService.DeleteNotifyByServerId(notID);
                        var data = result.result;
                        if (data.result == "1")
                        {   
                            alert("The call center will contact if the call is successfully paid. ");
                            $state.go("menu.home");
//                            
                        } else if (data.result == "2"){
                            alert("Patient can't pay the call fees so the call has been canceled");
                            $state.go("menu.home");
                        }
                    });
                };
                $scope.rejectCall = function () {
                    clearTimeout(buttonTimer);
                    var notID = $scope.call.notification_id;
                   // notificationService.DeleteNotifyByServerId(notID);
                    var data = $.param({
                        'call_id': $scope.call.call_id,
                        'notification': 3,
                        'notification_id': $scope.call.notification_id,
                        'doctor_mobile': window.localStorage.getItem('user_mobile'),
                        'doctor_id': window.localStorage.getItem('doctor_id')
                    });

                    WebService.wepServiceConnector(data, "postCallReject", false).then(function (result) {
                        var data = result.result;
                        if (data == "1")
                        {
                            $state.go('menu.home');
                        } else {
                            $state.go('menu.home');
                        }
                    });
                };
            });
        });
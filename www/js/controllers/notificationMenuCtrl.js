angular.module('app.controllers')
        .controller('notificationsmenuCtrl', function ($scope, $state, WebService) {
            $scope.notificationsmenudetails = function (id)
            {   console.log($scope.notificationmenu[id]);
                if ($scope.notificationmenu[id].message_type == 1)
                {
                   
                        $state.go("notification", {visit: $scope.notificationmenu[id]});
                        window.sessionStorage.setItem('long', $scope.notificationmenu[id].longitude);
                        window.sessionStorage.setItem('lat', $scope.notificationmenu[id].latitude);
                        window.sessionStorage.setItem('index', id);
                  
                } else if($scope.notificationmenu[id].message_type==6){
                        $state.go("callNotification", {call: $scope.notificationmenu[id]});
                }else if($scope.notificationmenu[id].message_type==5){
                            $state.go("callReport", {call: $scope.notificationmenu[id]});
                       
                }else{
                    var data = $.param(
                            {
                                'notification_id': $scope.notificationmenu[id].notification_id
                            });
                   // notificationService.DeleteNotifyById(id);
                    WebService.wepServiceConnector(data, "postSeenNotification", false).then(function (result) {
                        var data = result.result;
                        $state.go("menu.home", {visit: data});

                    });

                }
                
            };
//            var data = $.param(
//                            {
//                                'notify': notificationService.GetNotifyVerLocalDB(),
//                                'doctor_id': window.localStorage.getItem('doctor_id')  
//                            });
//                    
//                    WebService.wepServiceConnector(data, "getAllNotificationMenu", false).then(function (result) {
//                        $scope.notificationmenu=result.notification;
//
//                    });
      //      $scope.notificationmenu = notificationService.GetNotifyLocalDB();
        });


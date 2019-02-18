angular.module('app.controllers')
    .controller('callReportCtrl', function ($scope, backButton, $stateParams, $state, $ionicPlatform, WebService,$http,$ionicHistory) {
        $scope.$on("$ionicView.beforeEnter", function () {
            $ionicHistory.clearCache();
        });
        $scope.$on("$ionicView.enter", function (event, data) {
                backButton.GetSpecLocalDB(501, false, true, false);
                $scope.callStatus=1;
                if (typeof $stateParams.call === "object") {
                    $scope.call = $stateParams.call;
                } else {
                    $scope.call = JSON.parse($stateParams.call);
                }
                $scope.update=function(callStatus){
                    
                    $scope.callStatus=callStatus;
//                    alert($scope.callStatus);
                }
               $scope.sendReport=function(){
                   var data = $.param({
                        'call_id': $scope.call.call_id,
                        'notification_id': $scope.call.notification_id,
                        "callStatus":$scope.callStatus
                        
                    });

                    WebService.wepServiceConnector(data, "callReport", false).then(function (result) {
                        if(result.result== true){
                            $state.go("menu.home");
                        }
                    });
                   
               }
            });
    });



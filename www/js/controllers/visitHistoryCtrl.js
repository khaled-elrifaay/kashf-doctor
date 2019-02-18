angular.module('app.controllers')
        .controller('visitshistoryCtrl', function ($scope, $state, $ionicPlatform, visitService, WebService, configService, $ionicPopup) {
            $scope.goBackview = function () {
                $state.go("menu.home");
            };
            var data = $.param({
                'Visit[doctor_id]': window.localStorage.getItem('doctor_id'),
            });

            WebService.wepServiceConnector(data, "visitHistory", false).then(function (result) {
                $scope.visits = result.visit;
//                           
            });
            //$scope.visits = visitService.GetVisitLocalDB();

            $scope.visitReport = function (index) {
                $state.go('visitdetails', {visit_details: JSON.stringify($scope.visits[index])});
            };
            $scope.pay = function (visitId, index) {
//              
                //popup for cvv

                $scope.cvvdata={};

                // An elaborate, custom popup
                var myPopup = $ionicPopup.show({
                    template: '<input type="number" ng-model="cvvdata.cvv">',
                    title: 'Enter cvv number',
//                        subTitle: 'Please use normal things',
                    scope: $scope,
                    buttons: [
                        {text: 'Cancel'},
                        {
                            text: '<b>Save</b>',
                            type: 'button-positive',
                            onTap: function (e) {
                                if (!$scope.cvvdata.cvv) {
                                    //don't allow the user to close unless he enters wifi password
                                    e.preventDefault();
                                } else {
                                    var data = $.param({
                                        'visit_id': visitId,
                                        'cvv': $scope.cvvdata.cvv

                                    });
                                    $("#visit_" + visitId).attr('disabled', 'disabled');
                                    WebService.wepServiceConnector(data, "doctorPayCashVisit", false).then(function (result) {
                                        var data = result.result;
                                        if (data.cashVisit == 'paid') {
                                            var obj = $scope.visits
                                            obj.splice(index, 1);
                                            window.localStorage.removeItem('visit');
                                            window.localStorage.setItem('visit', JSON.stringify(obj));
                                            alert("Kashf Percentage visit fees have been discounted successfully, you are free to active your status now");
                                        } else if (data.cashVisit == 'notPaid') {
                                            alert("You not paid this visit");
                                        } else if (data.cashVisit == 'noCredit') {
                                            alert("You don't have credit card");
                                        }
                                        $state.reload();

                                    });
                                }
                            }
                        }
                    ]
                });

                myPopup.then(function (res) {


                    console.log('Tapped!', res);

                });

//                    $timeout(function () {
                //                        myPopup.close(); //close the popup after 3 seconds for some reason
                //                    }, 3000);


            };
        });


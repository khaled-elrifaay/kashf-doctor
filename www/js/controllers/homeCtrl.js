angular.module('app.controllers')
        .controller('homeCtrl', function ($scope,$ionicPopup, $ionicPlatform, backButton, $ionicSideMenuDelegate, WebService, configService, $ionicPopup,$ionicHistory,$stateParams, $state) {
            var mainScopeInCTRL = $scope;
            mainScopeInCTRL.initialstatus = false;
            mainScopeInCTRL.initialstatusCall = false;
            $ionicPlatform.ready(function () {



            // check if doctor has credit card 
                var data = $.param({
                    'doctor_id': window.localStorage.getItem('doctor_id')
                });
                 WebService.wepServiceConnector(data, "getCreditCards", false).then(function (result) {
                    console.log('home');
                    var response = result.result;
                    if (response == false) {
                       // $scope.card = true;
                       alert('Cash visit feature will be disabled, unless you enter your credit card data from payment tab at the menu with menu logo.');
                    } 
                });

            //check if the doctor has accepted a visit already and show them the map
            WebService.wepServiceConnector([], "activeVisitRequest", false).then(function (response) {
                if(typeof response.visit[0] != 'undefined')
                {
                    visit = response.visit[0];
                    console.log('visit', visit);
                    $stateParams.doctor_id = visit.doctor_id;
                    $state.go("patientlocationmap", {
                        visit: visit,
                    });                
                }
                
            });
            //---------------------------------------
//                $scope.$on("$ionicView.enter", function (event, data) {

                //mainScopeInCTRL.chge = function (val) {
                function chge(val) {
                    switch (val) {
                        case "1":
                            mainScopeInCTRL.initialstatus = true;
                            mainScopeInCTRL.initialstatusCall = true;
                            break;
                        case "2":

                            mainScopeInCTRL.initialstatus = false;
                            mainScopeInCTRL.initialstatusCall = true;

                            break;
                        case "0":

                            mainScopeInCTRL.initialstatus = false;
                            mainScopeInCTRL.initialstatusCall = false;
                            break;
                        default:
                            mainScopeInCTRL.initialstatus = false;
                            mainScopeInCTRL.initialstatusCall = false;
                            break;
                    }
                }

                $scope.$on('$stateChangeStart', function (e) {
                    backButton.GetSpecLocalDB(1000, false, false, false);
                    $ionicHistory.clearCache();

                    //added by zeinab
                    // $scope.showAlert();
                });
                $scope.toggleLeft = function () {
                    $ionicSideMenuDelegate.toggleLeft();
                };

                function watchPosition() {
                    var options = {
                        maximumAge: 3600000,
                        timeout: 1000000,
                        enableHighAccuracy: false
                    };
                    var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);
                    $scope.watchIDGlobal = watchID;
                    $scope.glopalBlocker = true;
                    function onSuccess(position) {
                        
                        var loc_data = $.param({
                            locationValue: {
                                long: position.coords.longitude,
                                lat: position.coords.latitude,
                                mob: window.localStorage.getItem('user_mobile')
                            }
                        });
                        //$scope.map.clear();
                        window.sessionStorage.setItem('currentLong', position.coords.longitude);
                        window.sessionStorage.setItem('currentLat', position.coords.latitude);
                        var Interval = setInterval(function () {
                            clearInterval(Interval);
                            $scope.glopalBlocker = true;
                        }, 5000);
                        if ($scope.glopalBlocker) {
                            WebService.wepServiceConnector(loc_data, "postHomeSetLocation", false).then(function (result) {
                                $scope.glopalBlocker = false;
                            });
                        }
                    }
                    function onError(error) {
                        // alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                    }
                }
                var dataGetDocStatus = $.param({
                    'doctor_id': window.localStorage.getItem('doctor_id')
                });
                WebService.wepServiceConnector(dataGetDocStatus, "getDoctorStatus", false).then(function (result) {
                    var response = result.result;
                    chge(response);
                    if (response == '1') {
                        watchPosition();
                        ///here was an notification interval
                        configService.changeGlopalTimer(true);
                    } else {
                        navigator.geolocation.clearWatch($scope.watchIDGlobal);
                        configService.changeGlopalTimer(false);
                    }

                });

                mainScopeInCTRL.statusCallValue = function (initialstatusCalll) {
                    
                    var dataCall = $.param({
                        statusValue: {
                            valCall: (initialstatusCalll) ? '2' : '0',
                            mob: window.localStorage.getItem('user_mobile')
                        }
                    });
                    WebService.wepServiceConnector(dataCall, "postDoctorStatus", false).then(function (resultCall) {
                        var dataCallResult = resultCall.result;
                        chge(dataCallResult);
                    });
                };


                mainScopeInCTRL.statusValue = function (initialstatuss) {
                    if(initialstatuss == 1){
                        mainScopeInCTRL.initialstatus = true;
                        alert("Please don't forget to open your location");
                        }else{
                            mainScopeInCTRL.initialstatus = false;
                        }
                    var dataVisit = $.param({
                        statusValue: {
                            val: (initialstatuss) ? '1' : '0',
                            mob: window.localStorage.getItem('user_mobile')
                        }
                    });

                    WebService.wepServiceConnector(dataVisit, "postDoctorStatus", false).then(function (resultVisit) {
                        var dataVisitResult = resultVisit.result;
                        
                        if (dataVisitResult == "1")
                        {
                            watchPosition();
                            //here was notification code
                            configService.changeGlopalTimer(true);
                        }else if (data == 'postponeForPayment') {
                            configService.changeGlopalTimer(false);
                            $scope.disabled = 'disabled';
                            alert("you can't change your status you should paid your visits first")
                            //var watchID = navigator.geolocation.watchPosition('');
                            navigator.geolocation.clearWatch($scope.watchIDGlobal);
                        } else {
                            configService.changeGlopalTimer(false);
                            navigator.geolocation.clearWatch($scope.watchIDGlobal);
                            // alert('failure');
                        }
                    });

                    var data = $.param({
                    'doctor_id': window.localStorage.getItem('doctor_id')
                });
                
                };
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)

                
                    backButton.GetSpecLocalDB(150, false, false, true);
                    $scope.map;
                    var markers = [];

                    var div = document.getElementById("map_canvas");
                    $scope.map = plugin.google.maps.Map.getMap(div, {
                        'mapType': plugin.google.maps.MapTypeId.ROADMAP,
                        'controls': {
                            'compass': true,
                            'myLocationButton': true,
                            'indoorPicker': true,
                            'zoom': true
                        },
                        'gestures': {
                            'scroll': true,
                            'tilt': true,
                            'rotate': true,
                            'zoom': true
                        },
                    });

                    $scope.map.clear();
                    for (var i = 0; i < markers.length; i++) {
                        markers[i].setVisible(false);
                        // markers[i].empty();
                    }
                    // Wait until the map is ready status.);
                    $scope.map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
                        $scope.map.getMyLocation(function (location) {
                            $scope.map.addMarker({
                                'position': location.latLng,
                                'title': 'home',
                                'icon': {
                                    'url': 'www/img/Pin.png',
                                    'size': {
                                        width: 40,
                                        height: 40
                                    }
                                }
                            }, function (marker) {

                                marker.showInfoWindow();
                                markers.push(marker);
                            });
                            $scope.map.moveCamera({
                                "target": location.latLng,
                                "zoom": 17
                            });
                        });
                    });
                
            });
        });
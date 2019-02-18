angular.module('app.controllers')
        .controller('patientlocationmapCtrl', function ($scope, $stateParams, $state, WebService,$rootScope) {
            $scope.$on("$ionicView.beforeEnter", function (event, data) {
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }
                // console.log($stateParams);
                $scope.visit=$stateParams.visit;
                if($scope.visit.payment==2){
                    $scope.creditVisitMessage=true;
                   // $scope.startButton=true;
                }
                var div = document.getElementById("patient_map_canvas");
                var markers = [];
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
                    }
                });

                for (var i = 0; i < markers.length; i++) {
                    markers[i].remove();
                }

                // Wait until the map is ready status.);
                $scope.map.clear();
                $scope.map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
                    $scope.map.clear();
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
                            // $scope.map.clear();
                            marker.showInfoWindow();
                            markers.push(marker);
                        });



                        $scope.map.addMarker({
                            'position': new plugin.google.maps.LatLng(window.sessionStorage.getItem('lat'), window.sessionStorage.getItem('long')),
                            'title': 'patient'
                        }, function (marker) {
                            // $scope.map.clear();
                            marker.showInfoWindow();
                        });


                        $scope.map.moveCamera({
                            "target": location.latLng,
                            "zoom": 17
                        });


                    });
                });


                $scope.startVisit = function () {
                    console.log($stateParams);
                    $visit_id = ($stateParams.visit.visit_id!=null)?$stateParams.visit.visit_id:$stateParams.visit_id;
                    var data = $.param({
                        'visit_id': $visit_id
                    });

                    WebService.wepServiceConnector(data, "postPatientLocationMap", false).then(function (result) {
                        var data = result.result;
                        $visit_id = ($stateParams.visit.visit_id!=null)?$stateParams.visit.visit_id:$stateParams.visit_id;
                        if (data.result == "1")
                        {
                            $state.go('endvisit', {visit_id: $visit_id,payment:data.payment,visit:$scope.visit});
                        } else {
                             alert('failurevisit'); 
                        }
                    });


                };



            });

        });






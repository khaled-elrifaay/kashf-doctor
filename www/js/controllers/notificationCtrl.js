angular.module('app.controllers')
        .controller('notificationCtrl', function ($scope, backButton, $stateParams, $state, $ionicPlatform, WebService,$ionicPopup) {
            $scope.$on("$ionicView.enter", function (event, data) {
                backButton.GetSpecLocalDB(501, false, true, false);
            });
            if (typeof $stateParams.visit === "object") {
                $scope.visit = $stateParams.visit;
                $scope.patient_name = $stateParams.visit.name;
                $scope.create_time = $stateParams.visit.create_time;
                $scope.gender = $stateParams.visit.gender;
                $scope.payment = $stateParams.visit.payment;
                $scope.notes = $stateParams.visit.notes;
            } else {
                $scope.visit = JSON.parse($stateParams.visit);
            }
            var myLocation = new google.maps.LatLng(window.sessionStorage.getItem('currentLat'), window.sessionStorage.getItem('currentLong'));
            var patientLocation = new google.maps.LatLng($scope.visit.latitude, $scope.visit.longitude);
            $scope.distance = google.maps.geometry.spherical.computeDistanceBetween(patientLocation, myLocation) / 1000;
            $scope.distance = parseFloat($scope.distance).toFixed(2);
            var geocoder = new google.maps.Geocoder();
            var latlng = {lat: parseFloat($scope.visit.latitude), lng: parseFloat($scope.visit.longitude)};
            $scope.address;
            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $scope.address = results[1].formatted_address;
                    } else {
                        $scope.address = 'No results found';
                    }
                } //else {
//                    window.alert('Geocoder failed due to: ' + status);
//                }
            });
            window.localStorage.setItem('patientAddress', $scope.address);
            var data = $.param({
                'visit_id': $scope.visit.visit_id
            });
            WebService.wepServiceConnector(data, "getDiseases", false).then(function (result) {
                var data = result.result;
                if (data.valid == "1")
                {

                    $scope.diseases = data.diseases;
                } else {
                    $scope.diseases = '';
                }
            });
            WebService.wepServiceConnector(data, "getAllergies", false).then(function (result) {
                var data = result.result;
                if (data.valid == "1")
                {
                    $scope.allergies = data.allergies;
                } else {
                    $scope.allergies = '';
                }
            });
             var buttonTimer = setTimeout(function(){
                    var data = $.param(
                        {
                            'visit_id': $scope.visit.visit_id,
                            'notification_id': $scope.visit.notification_id,
                        });
                    WebService.wepServiceConnector(data, "doctorVisitNoresponse", false).then(function (result) {
                        alert("The Last Request expired, as it was not answered in due time from your side");
                        $state.go("menu.home");
                     });
                    
                }, 600000);
            $scope.acceptVisit = function () {
                clearTimeout(buttonTimer);
//                $('#acceptVisitButton').attr('disabled','disabled');
                // var notID = $scope.visit.notification_id;
                // notificationService.DeleteNotifyByServerId(notID);
                var data = $.param({
                    'visit_id': $scope.visit.visit_id,
                    'notification': $scope.visit.notification_id,
                    'notification_id': $scope.visit.notification_id,
                    'doctor_mobile': window.localStorage.getItem('user_mobile'),
                    'doctor_id': window.localStorage.getItem('doctor_id')
                });

                WebService.wepServiceConnector(data, "postVisitAccept", false).then(function (result) {
                    var data = result.result;
                    if (data == "1")
                    {
                        var visitDetails = {
                            'patient_name': $scope.visit.name,
                            'gender': $scope.visit.gender,
                            'mobile': $scope.visit.mobile,
                            'address': $scope.address,
                            'payment': $scope.visit.payment
                        };
                        window.sessionStorage.setItem('show_patient_location', '1');
                        window.sessionStorage.setItem('patient_address', $scope.address);
                        console.log("payment check",$scope.payment);
                        if ($scope.payment == 1) {
                            $state.go('patientlocationmap', {visit_id: $scope.visit.visit_id, visit: visitDetails});
                        } else {
                            alert("Please wait until we confirm the visit was successfully paid.");
                            $state.go('menu.home');
                        }

                    } else {
                            alert("Patient can't pay this visit so canceled ");
                            $state.go('menu.home');
                    }
                });
            };
            $scope.rejectVisit = function () {
                clearTimeout(buttonTimer);
                // var notID = $scope.visit.notification_id;
                // notificationService.DeleteNotifyByServerId(notID);
                var data = $.param({
                    'visit_id': $scope.visit.visit_id,
                    'notification': 3,
                    'notification_id': $scope.visit.notification_id,
                    'doctor_mobile': window.localStorage.getItem('user_mobile'),
                    'doctor_id': window.localStorage.getItem('doctor_id')
                });

                WebService.wepServiceConnector(data, "postVisitReject", false).then(function (result) {
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
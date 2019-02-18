angular.module('app.controllers')
        .controller('callDetailsCtrl', function ($scope, $stateParams, $ionicPlatform,$state) {
            $scope.$on("$ionicView.enter", function (event, data) {
                var data = $.param({
                    id: $stateParams.id
                });
                var geocoder = new google.maps.Geocoder();
                $scope.image = $scope.base_url + "uploads/doctor-icon-dark-2.png";
                var response = JSON.parse($stateParams.call_details);
                $scope.calls = response;
                $scope.invistigations = response.investigation;
                $scope.treatments = response.treatment;
                $scope.notes = response.memo;
                $scope.doctor_name = response.doctor_first_name + ' ' + response.doctor_last_name;
                $scope.patient_name = response.patient_name;
                $scope.doctor_rate = response.rate;
                if (response.payment_type == 2) {
                    $scope.payment_type = "Credit Card";
                } else {
                    $scope.payment_type = "Cash";
                }
                var monthNames = [
                    "January", "February", "March",
                    "April", "May", "June", "July",
                    "August", "September", "October",
                    "November", "December"
                ];
                var date = new Date("2016-08-04 13:54:50");
                var day = date.getDate();
                var monthIndex = date.getMonth();
                var year = date.getFullYear();
                $scope.datetime = (day + ' ' + monthNames[monthIndex] + ' ' + year);
                var latlng = {lat: parseFloat(response.latitude), lng: parseFloat(response.longitude)};
                geocoder.geocode({'location': latlng}, function (results, status) {
                    $scope.address = results[0].formatted_address;
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            $scope.address = results[0].formatted_address;
                        } else {
                            $scope.address = 'No results found';
                        }
                    } else {
                        $scope.address = 'No results found';
                    }
                });
            });
        });

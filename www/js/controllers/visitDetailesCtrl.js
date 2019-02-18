angular.module('app.controllers')
        .controller('visitdetailsCtrl', function ($scope, $stateParams , profileService) {
                $scope.imageExists = function (url, callback) {
                var img = new Image();
                img.onload = function () {
                    callback(true);
                };
                img.onerror = function () {
                    callback(false);
                };
                img.src = url;
            };
            var docProfile = profileService.GetDocProfileLocalDB();
                  $scope.imageUrl = cordova.file.applicationDirectory + 'www/img/Doctor.png';
            //$scope.imageUrl =$scope.url + "uploads/doctors/photos/" + docProfile.photo;
            var serverImg = "http://dev.kashfapp.zadsolutions.com/" + "uploads/doctors/photos/" + docProfile.photo;
            $scope.imgcheckerres = false;
            $scope.imageExists(serverImg, function (exists) {
                if (exists == false) {
                    $scope.imgcheckerres = false;
                    // $scope.imageUrl = cordova.file.applicationDirectory + 'www/img/Doctor.png';
                    $scope.imageUrl= "http://dev.kashfapp.zadsolutions.com/" + "uploads/doctors/photos/" + docProfile.photo;

                    //$scope.imageUrl = "../img/Doctor.png";
                } else
                {
                    $scope.imgcheckerres = true;
                    $scope.imageUrl = "http://dev.kashfapp.zadsolutions.com/" + "uploads/doctors/photos/" + docProfile.photo;

                }
            });
            $scope.visits = JSON.parse($stateParams.visit_details);
            var geocoder = new google.maps.Geocoder();
            var latlng = {lat: parseFloat($scope.visits.latitude), lng: parseFloat($scope.visits.longitude)};
            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $scope.address = results[0].formatted_address;
                    } else {
                        $scope.address = 'No results found';
                    }
                } else {
                    window.alert('Geocoder failed due to: ' + status);
                }
            });

        });


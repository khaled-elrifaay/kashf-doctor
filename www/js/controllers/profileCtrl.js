angular.module('app.controllers')
        .controller('profileCtrl', function ($scope, $state, specService, profileService, WebService) {
            $("ion-item").removeClass("item-complex");
            var docProfile = profileService.GetDocProfileLocalDB();
            var docUserProfile = profileService.GetDocUserProfileLocalDB();
            $scope.signOut = function () {
                var data = $.param({
                    statusValue: {
                        val: false,
                        mob: window.localStorage.getItem('user_mobile')
                    }
                });
                WebService.wepServiceConnector(data, "postDoctorStatus", false).then(function (result) {
                    var data = result.result;
                    if (data != "1")
                    {
                    }
                });
                setTimeout(function () {
                    window.localStorage.removeItem('doctor_id');
                    window.localStorage.clear();
                    $state.go('login');
                }, 2000);

            };
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

            $scope.$on("$ionicView.enter", function (event, data) {
                $scope.specializationserver = {};
                $scope.docfulldata = profileService.GetDocProfileLocalDB();//data.doc;
                $scope.specslistchois = specService.GetSpecLocalDB();// data.specslist;
                $scope.docspecsselec = profileService.GetDocSpecsProfileLocalDB();//data.docspecs;
                $scope.docuserdata = profileService.GetDocUserProfileLocalDB();
                var result = [];
                if ($scope.specslistchois != null && $scope.docspecsselec != null) {
                    for (var i = 0; i < $scope.specslistchois.length; i++) {
                        for (var j = 0; j < $scope.docspecsselec.length; j++)
                        {
                            if ($scope.specslistchois[i].id == $scope.docspecsselec[j])
                            {
                                result.push({'id': $scope.specslistchois[i].id,
                                    'name': $scope.specslistchois[i].name
                                });
                            }
                        }
                    }
                }
                var getGradeName = function () {
                    if ($scope.docfulldata.grade == 1) {
                        return "CONSULTANT";
                    }
                    if ($scope.docfulldata.grade == 2) {
                        return  "SPECIALIST";
                    }
                    if ($scope.docfulldata.grade == 3) {
                        return  "LECTURER";
                    }
                    if ($scope.docfulldata.grade == 4) {
                        return "ASSISTANT PROFESSOR";
                    }
                    if ($scope.docfulldata.grade == 5) {
                        return  "PROFESSOR";
                    }
                    return "0";
                };
                $scope.imageUrl = cordova.file.applicationDirectory + 'www/img/Doctor.png';
                //$scope.imageUrl = $scope.url + "uploads/doctors/photos/" + $scope.docfulldata.photo;
                var serverImg = $scope.url + "uploads/doctors/photos/" + docProfile.photo;
                $scope.imgcheckerres = false;
                $scope.imageExists(serverImg, function (exists) {
                    if (exists == false) {
                        $scope.imgcheckerres = false;
                        $scope.imageUrl= "http://dev.kashfapp.zadsolutions.com/" + "uploads/doctors/photos/" + docProfile.photo;

                    } else
                    {
                        $scope.imageUrl = $scope.url + "uploads/doctors/photos/" + docProfile.photo;
                        $scope.imgcheckerres = true;
                    }
                });
                $scope.userdata = {
                    'FirstName': $scope.docuserdata.first_name,
                    'lastName': $scope.docuserdata.last_name,
                    'email': $scope.docuserdata.email,
                    'mobile': $scope.docuserdata.mobile,
                    'photo': $scope.imageUrl,
                    'specialization': result,
                    'grade': getGradeName(),
                    'fees': $scope.docfulldata.rate,
                    'gender': $scope.docfulldata.gender,
                    'rate' : $scope.docfulldata.call_fees,
                    'clinic_fees' : $scope.docfulldata.clinic_fees,
                };
            });
            console.log("he",docProfile);
            $scope.Edit = function () {
                $state.go("profileedit", {docfulldata: $scope.docfulldata});
            };
        });        
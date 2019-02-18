angular.module('app.controllers')
        .controller('menuCtrl', function ($scope, $ionicSideMenuDelegate, $state, profileService, WebService) {
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
            var docUserProfile = profileService.GetDocUserProfileLocalDB();
            console.log(docProfile.hospital_id);
            if(docProfile.hospital_id ==null){
                $scope.paymentFlage= false; 
            }else{
                $scope.paymentFlage= true;
            }
            // console.log(typeof docProfile.hospital_id);
             $scope.imageUrl = cordova.file.applicationDirectory + 'www/img/Doctor.png';
            //$scope.imageUrl =$scope.url + "uploads/doctors/photos/" + docProfile.photo;
            var serverImg = "https://kashf247.com/" + "uploads/doctors/photos/" + docProfile.photo;
            $scope.imgcheckerres = false;
            $scope.imageExists(serverImg, function (exists) {
                if (exists == false) {
                    $scope.imgcheckerres = false;
                    // $scope.imageUrl = cordova.file.applicationDirectory + 'www/img/Doctor.png';
                    $scope.imageUrl= "https://kashf247.com/" + "uploads/doctors/photos/" + docProfile.photo;

                    //$scope.imageUrl = "../img/Doctor.png";
                } else
                {
                    $scope.imgcheckerres = true;
                    $scope.imageUrl = "https://kashf247.com/" + "uploads/doctors/photos/" + docProfile.photo;

                }
            });
            $scope.userdata = {
                'FirstName': docUserProfile.first_name,
                'lastName': docUserProfile.last_name,
                'email': docUserProfile.email,
                'mobile': docUserProfile.mobile,
                'photo': $scope.url + "uploads/doctors/photos/" + docProfile.photo,
                'fees': docProfile.rate
            };







            $("ion-item").removeClass("item-complex");
            $("ion-side-menu").removeClass("has-header");
            $scope.menuopened = {'display': 'none', 'z-index': '-999'};
            $scope.menustatus = true;
            // 
            $scope.toggelmenu = function () {
                $ionicSideMenuDelegate.$getByHandle('sideMenu').toggleLeft(!$scope.menustatus);
                if ($ionicSideMenuDelegate.isOpen())
                {
                    $scope.menustatus = true;
                    $scope.menuopened = {'display': 'block', 'z-index': '999'};
                } else
                {
                    $scope.menuopened = {'display': 'none', 'z-index': '-999'};
                    $scope.menustatus = false;
                }
                // $ionicSideMenuDelegate.$getByHandle('sideMenu').canDragContent($ionicSideMenuDelegate.isOpen());
                // $ionicSideMenuDelegate.toggleLeft($ionicSideMenuDelegate.isOpen());
            };

            $scope.onSwipeLeft = function () {
                $scope.menuopened = {'display': 'none', 'z-index': '-999'};
                $scope.menustatus = false;
                $scope.toggelmenu();
                //alert("i'm swipping right now");
            };


            $scope.onSwipeRight = function () {
                $scope.menustatus = true;
                $scope.menuopened = {'display': 'block', 'z-index': '999'};
                $scope.toggelmenu();
                //alert("i'm swipping right now");
            };
            $scope.$watch(function () {
                return $ionicSideMenuDelegate.isOpenLeft();
            },
                    function (isOpen) {
                        if (isOpen) {
                            $scope.menustatus = true;
                            $scope.menuopened = {'display': 'block', 'z-index': '999'};
                            //$scope.toggelmenu();
                            //alert("i'm opining");
                            // $scope.toggelmenu();
                            // console.log("open");
                        } else {
                            $scope.menuopened = {'display': 'none', 'z-index': '-999'};
                            $scope.menustatus = false;
                            //$scope.toggelmenu();
                        }
                    });
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
        });


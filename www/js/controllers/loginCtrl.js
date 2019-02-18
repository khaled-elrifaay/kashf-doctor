angular.module('app.controllers')
        .controller('loginCtrl', function ($scope, $state, backButton, WebService, $injector, $cordovaCamera) {
            $scope.$on("$ionicView.enter", function (event, data) {
                backButton.GetSpecLocalDB(501, false, false, true);
            });
            $scope.$on("$ionicView.leave", function (event, data) {
                backButton.GetSpecLocalDB(501, false, false, false);
            });
            $scope.log = function (userdata) {
                console.log("khaled");
                console.log("hello",userdata)
                $('#doctorloginform').validate({
                    rules: {
                        'mobile': {
                            required: true
                        },
                        'password': {
                            required: true
                        }
                    },
                    messages: {
                        'mobile': {
                            required: "Please enter mobile number"
                        },
                        'password': {
                            required: "Please enter password"
                        }
                    },
                    errorPlacement: function (error, element)
                    {
                        element.attr('title', error.text());
                        $(".error").tooltip(
                                {
                                    position:
                                            {
                                                my: "left+5 center",
                                                at: "right center"
                                            },
                                    tooltipClass: "ttError"
                                });
                    }
                });
                /*end validation*/

                if ($('#doctorloginform').valid()) {
                    var data = $.param({
                        LoginForm: {
                            mobile: userdata.mobile,
                            password: userdata.password
                        }
                    });
                    WebService.wepServiceConnector(data, "login", true).then(function (result) {
                        var data = result.result;
                        console.log(data);
                        if (data.mobile == userdata.mobile)
                        {
                            window.localStorage.setItem('user_mobile', data.mobile);
                            window.localStorage.setItem('doctor_id', data.doctorID);
                            var injector = $injector.get('profileService');
                            injector.UpdateProfileLocalDB(result);
                            console.log("result : ", result);
                            $state.go("menu.home");


                        } else {
                            var message = "Incorrect mobile or password ";
                            $("#errorsdialog").html(message);
                            $("#errorsdialog").dialog({
                                modal: true,
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        }
                    });
                }
            }
            $scope.login = function (userdata) {
                /*validation*/
                $('#doctorloginform').validate({
                    rules: {
                        'mobile': {
                            required: true
                        },
                        'password': {
                            required: true
                        }
                    },
                    messages: {
                        'mobile': {
                            required: "Please enter mobile number"
                        },
                        'password': {
                            required: "Please enter password"
                        }
                    },
                    errorPlacement: function (error, element)
                    {
                        element.attr('title', error.text());
                        $(".error").tooltip(
                                {
                                    position:
                                            {
                                                my: "left+5 center",
                                                at: "right center"
                                            },
                                    tooltipClass: "ttError"
                                });
                    }
                });
                /*end validation*/

                if ($('#doctorloginform').valid()) {
                    var data = $.param({
                        LoginForm: {
                            mobile: userdata.mobile,
                            password: userdata.password
                        }
                    });
                    WebService.wepServiceConnector(data, "login", true).then(function (result) {
                        var data = result.result;
                        console.log(data);
                        if (data.mobile == userdata.mobile)
                        {
                            window.localStorage.setItem('user_mobile', data.mobile);
                            window.localStorage.setItem('doctor_id', data.doctorID);
                            var injector = $injector.get('profileService');
                            injector.UpdateProfileLocalDB(result);
                            console.log("result : ", result);
                            $state.go("menu.home");


                        } else {
                            var message = "Incorrect mobile or password ";
                            $("#errorsdialog").html(message);
                            $("#errorsdialog").dialog({
                                modal: true,
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        }
                    });
                }
            };
            $scope.takePicture = function () {
                var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.CAMERA,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };

                $cordovaCamera.getPicture(options).then(function (imageData) {
                    $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    console.log('image '+$scope.imgURI);
                }, function (err) {
                    // An error occured. Show a message to the user
                });
                $scope.choosePhoto = function () {
                  var options = {
                    quality: 75,
                    destinationType: Camera.DestinationType.DATA_URL,
                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                    allowEdit: true,
                    encodingType: Camera.EncodingType.JPEG,
                    targetWidth: 300,
                    targetHeight: 300,
                    popoverOptions: CameraPopoverOptions,
                    saveToPhotoAlbum: false
                };
   
                    $cordovaCamera.getPicture(options).then(function (imageData) {
                        $scope.imgURI = "data:image/jpeg;base64," + imageData;
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }
            }
        });

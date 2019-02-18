angular.module('app.controllers')
        .controller('profileeditCtrl', function ($scope, $state,$cordovaCamera,$cordovaFile, $cordovaFileTransfer,$cordovaDevice, $ionicPopup, $cordovaActionSheet, $ionicPlatform, WebService, specService, profileService) {
            $scope.$on("$ionicView.enter", function (event, data) {
                $scope.buttonStatus = false;
                $scope.specializationserver = {};
/*$scope.image = null;
 
  $scope.showAlert = function(title, msg) {
    var alertPopup = $ionicPopup.alert({
      title: title,
      template: msg
    });
  };

$scope.loadImage = function() {
  var options = {
    title: 'Select Image Source',
    buttonLabels: ['Load from Library', 'Use Camera'],
    addCancelButtonWithLabel: 'Cancel',
    androidEnableCancelButton : true,
  };
  $cordovaActionSheet.show(options).then(function(btnIndex) {
    var type = null;
    if (btnIndex === 1) {
      type = Camera.PictureSourceType.PHOTOLIBRARY;
    } else if (btnIndex === 2) {
      type = Camera.PictureSourceType.CAMERA;
    }
    if (type !== null) {
      $scope.selectPicture(type);
    }
  });
};
$scope.selectPicture = function(sourceType) {
  var options = {
    quality: 100,
    destinationType: Camera.DestinationType.FILE_URI,
    sourceType: sourceType,
    saveToPhotoAlbum: false
  };
 
  $cordovaCamera.getPicture(options).then(function(imagePath) {
    // Grab the file name of the photo in the temporary directory
    var currentName = imagePath.replace(/^.*[\\\/]/, '');
 
    //Create a new name for the photo
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
 
    // If you are trying to load image from the gallery on Android we need special treatment!
    if ($cordovaDevice.getPlatform() == 'Android' && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      window.FilePath.resolveNativePath(imagePath, function(entry) {
        window.resolveLocalFileSystemURL(entry, success, fail);
        function fail(e) {
          console.error('Error: ', e);
        }
 
        function success(fileEntry) {
          var namePath = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
          // Only copy because of access rights
          $cordovaFile.copyFile(namePath, fileEntry.name, cordova.file.dataDirectory, newFileName).then(function(success){
            $scope.image = newFileName;
            console.log("khaled new image : ", $scope.image );
          }, function(error){
            $scope.showAlert('Error', error.exception);
          });
        };
      }
    );
    } else {
      var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      // Move the file to permanent storage
      $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function(success){
        $scope.image = newFileName;
      }, function(error){
        $scope.showAlert('Error', error.exception);
      });
    }
  },
  function(err){
    // Not always an error, maybe cancel was pressed...
  })
};
$scope.pathForImage = function(image) {
  if (image === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + image;
  }
};*/
    $scope.loadImage = function () {
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
                        console.log("myImage",$scope.imgURI);
                    }, function (err) {
                        // An error occured. Show a message to the user
                    });
                }

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
                $scope.docfulldata = profileService.GetDocProfileLocalDB();//data.doc;
                $scope.specslistchois = specService.GetSpecLocalDB();// data.specslist;
                $scope.docspecsselec = profileService.GetDocSpecsProfileLocalDB();//data.docspecs;
                $scope.docuserdata = profileService.GetDocUserProfileLocalDB();
                var docUserProfile = profileService.GetDocUserProfileLocalDB();
                var docfulldataas = profileService.GetDocProfileLocalDB();
                console.log("doc userdata in html" , docUserProfile);
                console.log("doc docfulldata in html" , docfulldataas);
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
                $scope.imgURI = cordova.file.applicationDirectory + 'www/img/Doctor.png';
                var serverImg = $scope.url + "uploads/doctors/photos/" + $scope.docfulldata.photo;
                $scope.imgcheckerres = false;
                $scope.imageExists(serverImg, function (exists) {
                    if (exists == false) {
                        $scope.imgcheckerres = false;
                    } else
                    {
                        $scope.imgURI = $scope.url + "uploads/doctors/photos/" + $scope.docfulldata.photo;
                        $scope.imgcheckerres = true;
                    }
                });

                $scope.userdata = {
                    'FirstName': $scope.docuserdata.first_name,
                    'lastName': $scope.docuserdata.last_name,
                    'email': $scope.docuserdata.email,
                    'mobile': $scope.docuserdata.mobile,
                    'photo': $scope.imgURI,
                    'specialization': $scope.docspecsselec,
                    'grade': getGradeName(),
                    'rate': $scope.docfulldata.rate,
                    'call_fees' : $scope.docfulldata.call_fees,
                    'clinic_fees' : $scope.docfulldata.clinic_fees,
                    'gender': $scope.docfulldata.gender
                };
              /*     $scope.userdata = {
                'FirstName': docUserProfile.first_name,
                'lastName': docUserProfile.last_name,
                'email': docUserProfile.email,
                'mobile': docUserProfile.mobile,
                'photo': $scope.url + "uploads/doctors/photos/" + docProfile.photo,
                'fees': docProfile.rate
            };*/
                console.log("hi", $scope.userdata);
            });
            $scope.save = function (userdata) {
                console.log("userdata",userdata);
                $scope.buttonStatus = true;
                var gg = document.getElementById('grade').value;
                var gender = document.getElementById('gender').value;
                var syn = $scope.docfulldata.syndicate_number;
                console.log("syndicate_number" ,syn);
                var data = $.param({
                    'Doctor[id]': window.localStorage.getItem('doctor_id'),
                    'User[first_name]': userdata.FirstName,
                    'User[last_name]': userdata.lastName,
                    'User[email]': userdata.email,
                    'User[mobile]': userdata.mobile,                    
                    'Doctor[doctor_specialization]': userdata.specialization,
                    'Doctor[grade]': gg,
                    'Doctor[rate]': userdata.rate,
                    'Doctor[call_fees]' :userdata.call_fees,
                    'Doctor[clinic_fees]' :userdata.clinic_fees,
                    'Doctor[gender]': gender,
                    'Doctor[photo]': $scope.imgURI
                });
                console.log("data",data);
                WebService.wepServiceConnector(data, "postProfileEdit", false).then(function (result) {
                    var data = result.result;
                    window.localStorage.setItem('call_fees', userdata.call_fees);
                        console.log("Res",result.result);
                    setTimeout(function () {
                        alert("Edited Successfully");
                        $scope.IsVisible = true;
                        $state.go("profile");
                    }, 5000);
                });
            };
        });
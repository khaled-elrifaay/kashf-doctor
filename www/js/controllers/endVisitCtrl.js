angular.module('app.controllers')
    .controller('endvisitCtrl', function ($scope, $stateParams, $state, $ionicHistory,WebService,treatService,investService,backButton) {
        $scope.$on("$ionicView.beforeEnter", function () {
            $ionicHistory.clearCache();
        });
        $scope.$on("$ionicView.enter", function (event, data) {
            backButton.GetSpecLocalDB(501, false, true, false);
        });
        $scope.$on("$ionicView.enter", function (event, data) {
            $scope.visit = $stateParams.visit;
            $scope.patient_name = $scope.visit.patient_name;
            $scope.address = $scope.visit.address;
            $scope.gender = $scope.visit.gender;
            $scope.mobile = $scope.visit.mobile;
            $scope.payment = $scope.visit.payment;
            

            $scope.inputs = [{
                value: null
            }];
            $scope.addInput = function () {
                console.log("new input");
                $scope.inputs.push({
                    value: null
                });
            };
            $scope.removeInput = function (index) {
                $scope.inputs.splice(index, 1);
            };
            $scope.list_investigations = investService.GetInvLocalDB();
            $scope.list_treatments = treatService.GetTreatLocalDB();

            var data = $.param({
                visit_id: $stateParams.visit_id
            });
            
            WebService.wepServiceConnector(data, "getEndVisitPayment", false).then(function (result) {
                var response = result.result;
                if (response == '1') {
                    $scope.display = "block";
                    $scope.validation = true;
                } else {
                    $scope.display = "none";
                    $scope.validation = false;
                }
            });
            $scope.data = {
                repeatSelect: null
            };
            $scope.treatments = {};
            $scope.inv = {};
            $scope.inv.investigations = [];
            $scope.cashPayment=false;
            if($stateParams.payment=="1"){
                $scope.cashPayment=true;
                $scope.isChecked=1;
            }
            $scope.update=function(cash){
               $scope.isChecked=cash; 
            }
            var doctorData = $.param({
               doctor_id: window.localStorage.getItem('doctor_id'), 
            });
            WebService.wepServiceConnector(doctorData, "checkDoctorInHospiatal", false).then(function (result) {
                if(result.result==false){
                    $scope.workInHospital=false;
                }else{
                    $scope.workInHospital=true;
                }
            });
            $scope.endVisit = function (inv, msg, treatments,cashpayment,selected,diagnoses,cvv) {
                $('#endVisitButton').attr('disabled','disabled');
                
                var data = $.param({
                    investigation: inv,
                    memo: msg,
                    visit_id: $stateParams.visit_id,
                    doctor_id: window.localStorage.getItem('doctor_id'),
                    treatment: treatments,
                    cashRecived:$scope.isChecked,
                    diagnoses:diagnoses,
                    cvv:$("#cvvNumber").val()
                });
              //  notificationService.DeleteNotifyLocalDB();
                WebService.wepServiceConnector(data, "postEndVisitForm", false).then(function (result) {
                    console.log("sdsa",result)
                    var response = result.result;
                    console.log("ressssss",result);
                    $state.go('menu.home');
                    if (response == '1') {
                        $state.go('menu.home');
                    }else if (response.cashVisit == 'notPaied'){
                        //alert("The cash visit not paid you will be deactive until pay this visit");
                        alert("This cash visit percentage was not transferred to Kashf. please call 0233335030 to reactivate your account");
                        $state.go('menu.home');
                    }else if (response.cashVisit == 'paied'){
                        alert("Kashf Percentage visit fees have been discounted successfully, you are free to active your status now");
                        $state.go('menu.home');
                    }else if (response.cashVisit == 'noCredit'){
                        alert("you can't pay fees because you don't have credit card you be deactivated until pay the visit");
                        $state.go('menu.home');
                    }else if (response =='2'){
                        alert('Visit Ended successfully');
                        $state.go('menu.home');
                    }
                    
                });
            };
        });
    });




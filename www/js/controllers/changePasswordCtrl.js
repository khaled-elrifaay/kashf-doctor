angular.module('app.controllers').controller('changepasswordCtrl', function ($scope, $state, WebService) {
    $scope.changePassword = function (userdata) {
        /*validation*/
        $('#changepasswordform').validate({
            rules: {
                'currentpassword': {
                    required: true
                },
                'newpassword': {
                    required: true
                },
                'confirmpassword': {
                    required: true
                }
            },
            messages: {
                'currentpassword': {
                    required: "Please enter your current password"
                },
                'newpassword': {
                    required: "Please enter a new password"
                },
                'confirmpassword': {
                    required: "Please enter the new password again"
                }
            },
            errorPlacement: function (error, element) {
                element.attr('title', error.text());
                $(".error").tooltip({
                    position: {
                        my: "left+5 center",
                        at: "right center"
                    },
                    tooltipClass: "ttError"
                });
            }
        });
        /*end validation*/
        var data = $.param({
            'current_password': userdata.currentpassword,
            'new_password': userdata.newpassword,
            'confirm_password': userdata.confirmpassword,
            'doctor_id': window.localStorage.getItem('doctor_id')
        });
        if ($('#changepasswordform').valid()) {
            WebService.wepServiceConnector(data, "updateChangePassword", false).then(function (result) {
                var data = result.result;
                if (data == "true") {
                    $state.go('menu.home');
                } else {
                    var message = "Current password is incorrect";
                    $("#oldpassworderrorsdialog").html(message);
                    $("#oldpassworderrorsdialog").dialog({
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
});
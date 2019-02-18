angular.module('app.controllers')
        .controller('forgetpasswordrequestCtrl', function ($scope, $state, WebService) {
            $scope.sendCode = function (userdata) {
                /*validation*/
                $('#forgetpasswordrequestform').validate({
                    rules: {
                        'mobile': {
                            required: true
                        }
                    },
                    messages: {
                        'mobile': {
                            required: "Please enter mobile number"
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
                var data = $.param({
                    mobile: userdata.mobile
                });
                if ($('#forgetpasswordrequestform').valid()) {
                    WebService.wepServiceConnector(data, "postForgotPasswordRequest", true).then(function (result) {
                        var data = result.result;
                        if (result.pending == "Not pending")
                        {
                            alert('success');
                            $state.go('newpassword');
                        } else if(result.pending == "pending"){
                            var message =
                                    "Please call the call center +20233335530 to complete your data";
                            $("#mobileerrorsdialog").html(message);
                            $("#mobileerrorsdialog").dialog({
                                modal: true,
                                buttons: {
                                    Ok: function () {
                                        $(this).dialog("close");
                                    }
                                }
                            });
                        }else{
                            var message =
                                    "This mobile number is not registered before .. please sign up";
                            $("#mobileerrorsdialog").html(message);
                            $("#mobileerrorsdialog").dialog({
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


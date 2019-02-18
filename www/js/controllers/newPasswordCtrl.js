angular.module('app.controllers')
        .controller('newpasswordCtrl', function ($scope, $state, WebService) {
            $scope.newPassword = function (userdata) {
                $('#newpasswordform').validate({
                    rules: {
                        'code': {
                            required: true
                        },
                        'password': {
                            required: true
                        }
                    },
                    messages: {
                        'code': {
                            required: "Please enter the code"
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
                var data = $.param({
                    code: userdata.code,
                    new_password: userdata.password
                });
                if ($('#newpasswordform').valid()) {
                    WebService.wepServiceConnector(data, "postNewPassword", true).then(function (result) {
                        var data = result.result;
                        if (data == "1")
                        {
                            alert('success');
                            $state.go('login');

                        } else {
                            var message =
                                    "Code not found ";
                            $("#codeerrorsdialog").html(message);
                            $("#codeerrorsdialog").dialog({
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
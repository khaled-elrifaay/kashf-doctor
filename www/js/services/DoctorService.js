angular.module('app.services')
        .factory('DoctorsService', ['$http','WebService', function ($http,WebService) {
                return {
                    GetDoctor: function () {

                        var dataform = $.param({
                            'doctor_id': window.localStorage.getItem('doctor_id')
                        });
                         return WebService.wepServiceConnector(dataform, "getDocData", false).then(function (result) {
                             return result;
                       
                    });
                        


                    }

                };
            }]);
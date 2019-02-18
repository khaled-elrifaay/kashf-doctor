angular.module('app.services')
        .service('callService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetCallLocalDB = function () {
                    var data = window.localStorage.getItem('call');
                    return (data !== null && data !== 'undefined') ? JSON.parse(data) : null;
                };
                this.GetCallVerLocalDB = function () {
                    var data = window.localStorage.getItem('callVer');
                    return (data !== null && data !== 'undefined') ? data : -1;
                };
                this.DeleteCallLocalDB = function () {
                    window.localStorage.removeItem('callVer');
                    window.localStorage.removeItem('call');
                };

                this.callService = function (call) {


                };

                this.DeleteCallByServerId = function (index) {
                    var obj = mainScope.GetCallLocalDB();
                    var newObj = [];
                    for (var i = 0; i < obj.length; i++)
                    {
                        if (obj[i].call_id != index)
                        {
                            newObj.push(obj[i]);
                        }
                    }
                    window.localStorage.removeItem('call');
                    window.localStorage.setItem('call', JSON.stringify(newObj));
                };

                this.UpdateCallLocalDB = function (call) {
                    window.localStorage.setItem('callVer', call.callVer);
                    var newcall = null;
                    if (mainScope.GetCallLocalDB() === null)
                    {
                        newcall = call.call;
                    } else
                    {
                        var newObj = call.call
                        newObj.forEach(function (entry) {
                            mainScope.DeleteCallByServerId(entry.call_id);
                        });
                        var obj = mainScope.GetCallLocalDB();
                        newObj.forEach(function (entry) {
                            obj.push(entry);
                        });
                        //obj.concat(call.call);
                        newcall = obj;
                    }
                    window.localStorage.setItem('call', JSON.stringify(newcall));

                };

                this.GetCallFromServer = function () {
                    var data = $.param({
                        'Call[id]': mainScope.GetCallVerLocalDB(),
                        'Call[doctor_id]': window.localStorage.getItem('doctor_id'),
                    });
                    if (configService.getCallLock() != false) {
                        configService.setCallLock(false);
                        WebService.wepServiceConnector(data, "callHistory", false).then(function (result) {
                            mainScope.UpdateCallLocalDB(result);
                        });
                    }
                };
            }]);
//        .factory('PatientPayCallService', function ($http) {
//            var patientPayCallService = {};
//
//            patientPayCallService.pay = function (payment_code) {
//                
//                };
//        });
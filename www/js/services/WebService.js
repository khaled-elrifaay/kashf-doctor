/*
 * paramas to be sent (
 *  *  * Something to define the app
 *  *  *  * In case login form ||reset password || confirmation code 
 *  *      *  * All of the above is glopal i.e. there is no user id
 *  *      *  * i.e. the sent to token will have defualt id -1
 *  *      *  * There will be a param defining that they are glopal forms
 *  *  * Current VERs of (Notification & Visit & SPC & Profile & Grades)
 *  *  * Token
 *  *  * The real request (Update profile || accept request ... etc)
 *  
 * 
 * 
 */
angular.module('app.services')
        .service('WebService', ['$http', 'Md5Service', 'ApiService', 'configService', '$q', '$injector', '$cordovaDevice', function ($http, Md5Service, ApiService, configService, $q, $injector, $cordovaDevice) {
                this.first = true;
                var mainScope = this;
                this.GetMD5Service = function (string) {
                    return Md5Service.GenerateMD5(string);
                };


                this.GetApiService = function (api) {
                    return ApiService.getApiUrl(api);
                };

                this.ReturnDataVer = function () {
                    //window.localStorage.setItem('patientAccountId', data.patientAccountId);
                    //window.localStorage.getItem('patientAccountId')
                    var allergiesVer = window.localStorage.getItem('allergiesVer');
                    var areaVer = window.localStorage.getItem('areaVer');
                    var diseasesVer = window.localStorage.getItem('diseasesVer');
                    var investVer = window.localStorage.getItem('investVer');
                    var specVer = window.localStorage.getItem('specVer');
                    var treatVer = window.localStorage.getItem('treatVer');
                    var notifyVer = window.localStorage.getItem('notificationVer');
                    var visitVer = window.localStorage.getItem('visitVer');
                    var profileVer = window.localStorage.getItem('profileVer');
                    var gradeVer = window.localStorage.getItem('gradeVer');
                    var callVer = window.localStorage.getItem('callVer');
                    var cardVer = window.localStorage.getItem('cardVer');

                    return $.param({
                        appData: {
                            allergies: (allergiesVer == null) ? -1 : allergiesVer,
                            area: (areaVer == null) ? -1 : areaVer,
                            diseases: (diseasesVer == null) ? -1 : diseasesVer,
                            invest: (investVer == null) ? -1 : investVer,
                            spec: (specVer == null) ? -1 : specVer,
                            treat: (treatVer == null) ? -1 : treatVer,
                            notify: (notifyVer == null) ? -1 : notifyVer,
                            visit: (visitVer == null) ? -1 : visitVer,
                            profile: (profileVer == null) ? -1 : profileVer,
                            grade: (gradeVer == null) ? -1 : gradeVer,
                            call: (callVer == null) ? -1 : callVer,
                            card: (cardVer == null) ? -1 : cardVer,
                        }
                    });
                };

                this.UpdateInvoker = function (data) {
                    var injector;
                    if (data.allergies)
                    {
                        configService.setAllergiesLock(true);
                        injector = $injector.get('allergiesService');
                        injector.GetAllergiesFromServer();
                        configService.setAllergiesLock(false);
                    }
                    if (data.area)
                    {
                        configService.setAreaLock(true);
                        injector = $injector.get('areaService');
                        injector.GetAreaFromServer();
                        configService.setAreaLock(false);
                    }
                    if (data.diseases)
                    {
                        configService.setDiseasesLock(true);
                        injector = $injector.get('diseasesService');
                        injector.GetDiseasesFromServer();
                        configService.setDiseasesLock(false);
                    }
                    if (data.invest)
                    {
                        configService.setInvLock(true);
                        injector = $injector.get('investService');
                        injector.GetInvFromServer();
                        configService.setInvLock(false);
                    }

                    if (data.spec)
                    {
                        configService.setSpecLock(true);
                        injector = $injector.get('specService');
                        injector.GetSpecFromServer();
                        configService.setSpecLock(false);
                    }
                    if (data.treat)
                    {
                        configService.setTreatLock(true);
                        injector = $injector.get('treatService');
                        injector.GetTreatFromServer();
                        configService.setTreatLock(false);
                    }
                    // if (data.notify)
                    // {
                    //     configService.setNotifyLock(true);
                    //     injector = $injector.get('notificationService');
                    //     injector.GetNotifyFromServer();
                    //     configService.setNotifyLock(false);
                    // }
                    if (data.visit)
                    {
                        configService.setVisitLock(true);
                        injector = $injector.get('visitService');
                        injector.GetVisitFromServer();
                        configService.setVisitLock(false);
                    }

                    if (data.grade)
                    {
                        configService.setGradeLock(true);
                        injector = $injector.get('gradeService');
                        injector.GetGradeFromServer();
                        configService.setGradeLock(false);
                    }

                    if (data.profile)
                    {
                        configService.setProfileLock(true);
                        injector = $injector.get('profileService');
                        injector.GetProfileFromServer();
                        configService.setProfileLock(false);
                    }
                    if (data.call)
                    {
                        configService.setCallLock(true);
                        injector = $injector.get('callService');
                        injector.GetCallFromServer();
                        configService.setCallLock(false);
                    }
                    if (!data.card)
                    {
                        configService.setCardLock(true);
                        injector = $injector.get('cardService');
                        injector.GetCardFromServer();
                        configService.setCardLock(false);
                    }

                };



                mainScope.wepServiceConnector = function (ctrlObj, destinationName, ctrlType) {
                    var uuid = $cordovaDevice.getUUID();
                    if (mainScope.first) {
                        mainScope.first = false;
                        mainScope.recurisiveFunc();
                    }
                    var now = new Date();
                    var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
                    var unixTime = Math.round(+utc_timestamp / 1000); //Math.round(+new Date() / 1000);
                    var destinationUrl = ApiService.getApiUrl(destinationName);
                    var appPass = configService.getAppPassword();
                    var appType = configService.getAppType();
                    var ran = Math.floor((Math.random() * 100000) + (Math.random() * 1000));

                    var docId = "-1";
                    var sessionToken = "-20020";
                    if (!ctrlType) {
                        docId = window.localStorage.getItem('doctor_id');
                        var DocUserdata = window.localStorage.getItem('docuser');
                        if (DocUserdata != null && DocUserdata != 'undefined') {
                            sessionToken = JSON.parse(DocUserdata).token;
                        }
                    }
                    var beforeMd5 = unixTime + docId + sessionToken + appPass + ran;
                    var md5 = Md5Service.GenerateMD5(beforeMd5);

                    var data = mainScope.ReturnDataVer() + "&" + ctrlObj + "&" + $.param({
                        appData: {
                            appType: appType,
                            unixTime: unixTime,
                            docId: docId,
                            md5: md5,
                            uuid: uuid,
                            ran: ran,
                            device_id: window.localStorage.getItem('device_id')

                        }
                    });
                    if (appType == false) {
                        if (window.localStorage.getItem('doctor_id') != null &&
                            window.localStorage.getItem('doctor_id') != 'undefined' &&
                            window.localStorage.getItem('docuser') != null &&
                            window.localStorage.getItem('docuser') != 'undefined') {
                        } else {
                            return true;
                        }
                    }

                    var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
                    return  $http.post(destinationUrl, data, config).then(function (data, status) {
                        /*
                         * in case there new data update it before return back to the ctrl
                         * 
                         */
                        if (data.data.updates != null) {

                            setTimeout(function () {
                                mainScope.UpdateInvoker(data.data.updates);
                            }, 3000);

                        }
                        ret = $q.when(data.data.data);
                        return ret;
                    }, function (status) {
                        if (status.status == 403) {
                            alert("Your account had been logged-in from another device ...");
                            window.localStorage.removeItem('doctor_id');
                            window.localStorage.clear();
                            navigator.app.exitApp();
                        }

                    });
                    alert("something went wrong");
                    return "something went wrong";

                };




                this.recurisiveFunc = function () {
                    var timer = configService.getGlopalTimer();
                    var Interval = setInterval(function () {
                        clearInterval(Interval);
                        var locDataFlag = configService.getEmptyReqLock();
                        if (!locDataFlag) {
                            if (window.localStorage.getItem('doctor_id') != null && window.localStorage.getItem('doctor_id') != 'undefined' && window.localStorage.getItem('docuser') != null && window.localStorage.getItem('docuser') != 'undefined') {
                                mainScope.wepServiceConnector("", "postDoctoremptyRequest", false).then(function (result) {
                                });
                            }
                        }
                        mainScope.recurisiveFunc();
                    }, timer * 1);


                };

            }]);
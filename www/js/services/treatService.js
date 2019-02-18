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
        .service('treatService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetTreatLocalDB = function () {
                    var data = window.localStorage.getItem('treat');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteTreatLocalDB = function () {
                    window.localStorage.removeItem('treatVer');
                    window.localStorage.removeItem('treat');
                };

                this.UpdateTreatLocalDB = function (treat) {
                    window.localStorage.setItem('treatVer', treat.treatVer);
                    window.localStorage.setItem('treat', JSON.stringify(treat.treat));
                };

                this.GetTreatFromServer = function () {
                    if (configService.getTreatLock() != false) {
                        configService.setTreatLock(false);
                        WebService.wepServiceConnector("", "getTreatments", false).then(function (result) {
                            mainScope.UpdateTreatLocalDB(result);
                        });
                    }
                };
            }]);
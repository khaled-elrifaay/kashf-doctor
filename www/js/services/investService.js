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
        .service('investService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetInvLocalDB = function () {
                    var data = window.localStorage.getItem('invest');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteInvLocalDB = function () {
                    window.localStorage.removeItem('investVer');
                    window.localStorage.removeItem('invest');
                };

                this.UpdateInvLocalDB = function (invest) {
                    window.localStorage.setItem('investVer', invest.investVer);
                    window.localStorage.setItem('invest', JSON.stringify(invest.invest));
                };

                this.GetInvFromServer = function () {
                    if (configService.getInvLock() != false) {
                        configService.setInvLock(false);
                        WebService.wepServiceConnector("", "getInvestigations", false).then(function (result) {
                            mainScope.UpdateInvLocalDB(result);
                        });
                    }
                };
            }]);
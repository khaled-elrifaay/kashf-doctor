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
        .service('specService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetSpecLocalDB = function () {
                    var data = window.localStorage.getItem('spec');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteSpecLocalDB = function () {
                    window.localStorage.removeItem('specVer');
                    window.localStorage.removeItem('spec');
                };

                this.UpdateSpecLocalDB = function (spec) {
                    window.localStorage.setItem('specVer', spec.specVer);
                    window.localStorage.setItem('spec', JSON.stringify(spec.spec));
                };

                this.GetSpecFromServer = function () {
                    if (configService.getSpecLock() != false) {
                        configService.setSpecLock(false);
                        WebService.wepServiceConnector("", "getDocSpecialization", false).then(function (result) {
                            mainScope.UpdateSpecLocalDB(result);
                        });
                    }
                };
            }]);
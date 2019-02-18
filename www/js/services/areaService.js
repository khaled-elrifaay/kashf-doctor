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
        .service('areaService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetAreaLocalDB = function () {
                    var data = window.localStorage.getItem('area');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteAreaLocalDB = function () {
                    window.localStorage.removeItem('areaVer');
                    window.localStorage.removeItem('area');
                };

                this.UpdateAreaLocalDB = function (area) {
                    window.localStorage.setItem('areaVer', area.areaVer);
                    window.localStorage.setItem('area', JSON.stringify(area.area));
                };

                this.GetAreaFromServer = function () {
                    if (configService.getAreaLock() != false) {
                        configService.setAreaLock(false);
                        WebService.wepServiceConnector("", "getAllArea", false).then(function (result) {
                            mainScope.UpdateAreaLocalDB(result);
                        });
                    }
                };
            }]);
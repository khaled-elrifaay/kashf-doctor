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
        .service('allergiesService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetAllergiesLocalDB = function () {
                    var data = window.localStorage.getItem('allergies');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteAllergiesLocalDB = function () {
                    window.localStorage.removeItem('allergiesVer');
                    window.localStorage.removeItem('allergies');
                };

                this.UpdateAllergiesLocalDB = function (allergies) {
                    window.localStorage.setItem('allergiesVer', allergies.allergiesVer);
                    window.localStorage.setItem('allergies', JSON.stringify(allergies.allergies));
                };

                this.GetAllergiesFromServer = function () {
                    if (configService.getAllergiesLock() != false) {
                        configService.setAllergiesLock(false);
                        WebService.wepServiceConnector("", "getAllAllergies", false).then(function (result) {
                            mainScope.UpdateAllergiesLocalDB(result);
                        });
                    }
                };
            }]);
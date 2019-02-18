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
        .service('diseasesService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetDiseasesLocalDB = function () {
                    var data = window.localStorage.getItem('diseases');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteDiseasesLocalDB = function () {
                    window.localStorage.removeItem('diseasesVer');
                    window.localStorage.removeItem('diseases');
                };

                this.UpdateDiseasesLocalDB = function (diseases) {
                    window.localStorage.setItem('diseasesVer', diseases.diseasesVer);
                    window.localStorage.setItem('diseases', JSON.stringify(diseases.diseases));
                };

                this.GetDiseasesFromServer = function () {
                    if (configService.getDiseasesLock() != false) {
                        configService.setDiseasesLock(false);
                        WebService.wepServiceConnector("", "getAllDiseases", false).then(function (result) {
                            mainScope.UpdateDiseasesLocalDB(result);
                        });
                    }
                };
            }]);
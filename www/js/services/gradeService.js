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
        .service('gradeService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetGradeLocalDB = function () {
                    var data = window.localStorage.getItem('grade');
                    return (data != null)? JSON.parse(data):null;
                };

                this.DeleteGradeLocalDB = function () {
                    window.localStorage.removeItem('gradeVer');
                    window.localStorage.removeItem('grade');
                };

                this.UpdateGradeLocalDB = function (grade) {
                    window.localStorage.setItem('gradeVer', grade.gradeVer);
                    window.localStorage.setItem('grade', JSON.stringify(grade.grade));
                };

                this.GetGradeFromServer = function () {
                    if (configService.getGradeLock() != false) {
                        configService.setGradeLock(false);
                        WebService.wepServiceConnector("", "getDocGrades", false).then(function (result) {
                            mainScope.UpdateGradeLocalDB(result);
                        });
                    }
                };
            }]);
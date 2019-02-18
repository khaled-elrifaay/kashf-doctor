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
        .service('profileService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetDocProfileLocalDB = function () {
                    var data = window.localStorage.getItem('doc');
                    return (data != null) ? JSON.parse(data) : null;
                };

                this.GetDocAreaProfileLocalDB = function () {
                    var data = window.localStorage.getItem('docarea');
                    return (data != null) ? JSON.parse(data) : null;
                };

                this.GetDocUserProfileLocalDB = function () {
                    var data = window.localStorage.getItem('docuser');
                    return (data != null) ? JSON.parse(data) : null;
                    console.log("docuser from localStorage" , data);
                };


                this.GetDocSpecsProfileLocalDB = function () {
                    var data = window.localStorage.getItem('docspecs');
                    return (data != null) ? JSON.parse(data) : null;
                    console.log("docspecs from localStorage" , data);
                };
                this.DeleteProfileLocalDB = function () {
                    window.localStorage.removeItem('profileVer');
                    window.localStorage.removeItem('profile');
                };

                this.UpdateProfileLocalDB = function (profile) {
                    window.localStorage.setItem('profileVer', profile.profileVer);
                    window.localStorage.setItem('doc', JSON.stringify(profile.profile.doc));
                    window.localStorage.setItem('docarea', JSON.stringify(profile.profile.docarea));
                    window.localStorage.setItem('docuser', JSON.stringify(profile.profile.docuser));
                    window.localStorage.setItem('docspecs', JSON.stringify(profile.profile.docspecs));
                };

                this.GetProfileFromServer = function () {
                    if (configService.getProfileLock() != false) {
                        configService.setProfileLock(false);
                        var data = $.param({
                            'doctor_id': window.localStorage.getItem('doctor_id'),
                        });
                        WebService.wepServiceConnector(data, "getDoctorProfile", false).then(function (result) {
                            mainScope.UpdateProfileLocalDB(result);
                        });
                    }
                };
            }]);
angular.module('app.services')
        .service('visitService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetVisitLocalDB = function () {
                    var data = window.localStorage.getItem('visit');
                    return (data !== null && data !== 'undefined') ? JSON.parse(data) : null;
                };
                this.GetVisitVerLocalDB = function () {
                    var data = window.localStorage.getItem('visitVer');
                    return (data !== null && data !== 'undefined') ? data : -1;
                };
                this.DeleteVisitLocalDB = function () {
                    window.localStorage.removeItem('visitVer');
                    window.localStorage.removeItem('visit');
                };

                this.visitService = function (visit) {


                };


                this.UpdateVisitLocalDB = function (visit) {
                    window.localStorage.setItem('visitVer', visit.visitVer);
                    var newvisit = null;
                    if (mainScope.GetVisitLocalDB() === null)
                    {
                        newvisit = visit.visit;
                    } else
                    {
                        var obj = mainScope.GetVisitLocalDB();
                        var newObj = visit.visit
                        newObj.forEach(function (entry) {
                            obj.push(entry);
                        });
                        obj.concat(visit.visit);
                        newvisit = obj;

                    }
                    window.localStorage.setItem('visit', JSON.stringify(newvisit));

                };

                this.GetVisitFromServer = function () {
                    var data = $.param({
                        'Visit[id]': mainScope.GetVisitVerLocalDB(),
                        'Visit[doctor_id]': window.localStorage.getItem('doctor_id'),
                    });
                    if (configService.getVisitLock() != false) {
                        configService.setVisitLock(false);
                        WebService.wepServiceConnector(data, "visitHistory", false).then(function (result) {
                            mainScope.UpdateVisitLocalDB(result);
                        });
                    }
                };
            }]);
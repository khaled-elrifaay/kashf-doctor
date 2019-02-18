angular.module('app.services')
        .service('cardService', ['WebService', 'configService', function (WebService, configService) {
                var mainScope = this;
                this.GetCardLocalDB = function () {
                    var data = window.localStorage.getItem('card');
                    return (data != null && data != 'undefined')? JSON.parse(data):null;
                };

                this.DeleteCardLocalDB = function () {
                    window.localStorage.removeItem('cardVer');
                    window.localStorage.removeItem('card');
                };

                this.UpdateCardLocalDB = function (card) {
                    window.localStorage.setItem('cardVer', card.cardVer);
                    window.localStorage.setItem('card', JSON.stringify(card.card));
                };

                this.GetCardFromServer = function () {
                    if (configService.getCardLock() != false) {
                        configService.setCardLock(false);
                        WebService.wepServiceConnector("", "getCardLocal", false).then(function (result) {
                            mainScope.UpdateCardLocalDB(result);
                        });
                    }
                };
            }]);
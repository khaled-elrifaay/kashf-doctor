angular.module('app.controllers')
        .controller('paymentCtrl', function ($scope, $stateParams,$injector, $ionicLoading, $ionicPlatform, $state, $sce, WebService, cardService) {
            $scope.goBackview = function () {
                $state.go("menu.home");
            };
            $scope.paymenttypes = true;
            $scope.carddata = true;
            $scope.cardform = false;
            $scope.cardformAdd = false;
            $scope.cardformSecure = false;
            $scope.cardformEdit = false;
            $scope.CardsDataBig = cardService.GetCardLocalDB();
            $scope.userdata = {
                cardnumber: "",
                cvv: "",
                expyear: "",
                expmonth: ""
            };
            $scope.resetUserData = function (CardAddData) {
                if (CardAddData == null) {
                    $scope.userdata = {
                        cardnumber: "",
                        cvv: "",
                        expyear: "",
                        expmonth: ""
                    };
                }
            };

            $scope.prepareSecureIframe = function(CallBackJsonObj){
                if(CallBackJsonObj.success == "false" && 
                    CallBackJsonObj.use_redirection == "true"){
                    $scope.iframeUrl = CallBackJsonObj.redirection_url;
                }
            };

            $scope.setIframeUrl = function(){
                if (typeof $scope.fromData !== 'undefined' &&
                    typeof $scope.fromData.CallBackJsonObj !== 'undefined') {
                    return $sce.trustAsResourceUrl($scope.fromData.CallBackJsonObj.redirection_url);
                }

                return "";
            };

            $scope.getIframeUrl = function(){
                elm = document.getElementById('cardformSecureIframe');
                url = elm.contentWindow.location.href;

                if(url && url.indexOf('payMobCallBack') > -1){
                    delete $scope.fromData.CallBackJsonObj;
                    elm.src = "about:blank";
                    var Interval = setInterval(function () {
                        clearInterval(Interval);
                        $scope.showBack();
                    }, 500);

                    if(url.indexOf('success=true') > -1 ){
                        $scope.resetUserData(null);
                        alert("Card Has Been Saved");
                    }else if(url.indexOf('success=false') > -1){
                        alert("Failed");
                    }
                }
            };

            $scope.showAdd = function () {
                $scope.cardformAdd = true;
                $scope.paymenttypes = false;
                $scope.carddata = false;
                $scope.cardform = false;
                $scope.cardformEdit = false;
                $scope.cardformSecure = false;
                $scope.resetUserData(null);
            };

            $scope.showSecure = function () {
                $scope.prepareSecureIframe($scope.fromData);
                $scope.cardformAdd = false;
                $scope.paymenttypes = false;
                $scope.carddata = false;
                $scope.cardform = false;
                $scope.cardformEdit = false;
                $scope.cardformSecure = true;
            };

            $scope.showEdit = function (cardE) {
                $scope.cardformEdit = true;
                $scope.paymenttypes = false;
                $scope.carddata = false;
                $scope.cardform = false;
                $scope.cardformAdd = false;
                $scope.cardformSecure = false;
                $scope.resetUserData(null);
                $scope.CurrentCardE = cardE;
            };

            $scope.showBack = function () {
                var injector = $injector.get('configService');
                injector.setCardLock(true);
                cardService.DeleteCardLocalDB();
                cardService.GetCardFromServer();
                injector.setCardLock(false);
                $scope.cardformEdit = false;
                $scope.paymenttypes = true;
                $scope.carddata = true;
                $scope.cardform = false;
                $scope.cardformAdd = false;
                $scope.cardformSecure = false;
                $scope.resetUserData(null);
                $ionicLoading.show({
                    template: '<ion-spinner icon="lines"></ion-spinner>',
                    duration: 95000
                });

                setTimeout(function () {
                    $ionicLoading.hide();
                    $state.go($state.current, $stateParams, {reload: true, inherit: false});

                }, 2000);
            };

            $scope.deleteCardLocal = function () {
                $ionicLoading.show({
                    template: '...Deleting Card...<br><ion-spinner icon="lines"></ion-spinner>',
                    duration: 95000
                });
                var cardPrimeId = $.param({
                    CardID: $scope.CurrentCardE.id
                });
                WebService.wepServiceConnector(cardPrimeId, "deleteCardLocal", false).then(function (result) {
                    if (result.result == 1)
                    {
                        $ionicLoading.hide();
                        $scope.resetUserData(null);
                        alert("Card Deleted");
                        $scope.showBack();
                    } else {
                        $ionicLoading.hide();
                        alert("error");
                    }
                });
            };

            $scope.makeCardPrim = function () {
                $ionicLoading.show({
                    template: '...Changing Card to Primary...<br><ion-spinner icon="lines"></ion-spinner>',
                    duration: 95000
                });
                var cardPrimeId = $.param({
                    CardID: $scope.CurrentCardE.id
                });
                WebService.wepServiceConnector(cardPrimeId, "makeCardPrim", false).then(function (result) {
                    if (result.result == 1)
                    {
                        $ionicLoading.hide();
                        $scope.resetUserData(null);
                        alert("Card changed to primary");
                        $scope.showBack();
                    } else {
                        $ionicLoading.hide();
                        alert("error");
                    }
                });
            };
   
            $scope.getFromCardData = function (edit) {
                $ionicLoading.show({
                    template: '...Verifying your card...<br><ion-spinner icon="lines"></ion-spinner>',
                    duration: 95000
                });
                var cardNum = parseInt($scope.userdata.cardnumber + "");
                var CardTypeVar = $scope.GetCardType(cardNum);

                var cardType;
                if (edit != null) {
                    cardType = $.param({
                        CardType: CardTypeVar,
                        CardID: $scope.CurrentCardE.id
                    });
                } else {
                    cardType = $.param({
                        CardType: CardTypeVar
                    });
                }

                var expmonth = $scope.userdata.expmonth;
                var expyear = ($scope.userdata.expyear < 10) ? "0" + $scope.userdata.expyear : $scope.userdata.expyear;
                
                var toPayMob = $.param({                        
                    "pan": $scope.userdata.cardnumber,
                    "cardholder_name": $scope.userdata.cardholder_name,
                    "expiry_month": expmonth,
                    "expiry_year": expyear,
                    "cvn": $scope.userdata.cvv
                });
                
                WebService
                    .wepServiceConnector(toPayMob, "getCardFormData", false)
                    .then(function (result) {
                        $scope.fromData = result.result;
                       // var toPayMob = $.param({
                       //     amount_M: $scope.fromData.amount_M,
                       //     currency_O: $scope.fromData.currency_O,
                       //     customer_address_O: $scope.fromData.customer_address_O,
                       //     customer_email_O: $scope.fromData.customer_email_O,
                       //     customer_name_O: $scope.fromData.customer_name_O,
                       //     customer_phone_O: $scope.fromData.customer_phone_O,
                       //     extra_comments_O: $scope.fromData.extra_comments_O,
                       //     merchant_id_M: $scope.fromData.merchant_id_M,
                       //     secure_hash_M: $scope.fromData.secure_hash_M,
                       //     tokenize_card_C: $scope.fromData.tokenize_card_C,
                       //     unique_customer_id_O: $scope.fromData.unique_customer_id_O,
                       //     unique_order_id_M: $scope.fromData.unique_order_id_M,
                       //     c_holder_name_U: $scope.fromData.customer_name_O,
                       //     c_pan_U: $scope.userdata.cardnumber,
                       //     c_expiry_mm_U: expmonth,
                       //     c_expiry_yy_U: expyear,
                       //     c_cvv_U: $scope.userdata.cvv,
                       // });
                       // WebService.wepServiceConnector(toPayMob, "addCardRemote", "2020").then(function (result) {
                        if($scope.fromData.CallBackJsonObj.success == "false" && 
                            $scope.fromData.CallBackJsonObj.use_redirection == true){
                            $ionicLoading.hide();
                            $scope.showSecure();
                            
                        } else {
                            $scope.postPayment();
                        }
                   // });

                }).catch(function(){
                    alert("An error occurred, please try again");
                    $ionicLoading.hide();
                });

            };

            $scope.postPayment = function() {
                if($scope.fromData.token != null){
                    var CardIDParam = $.param({
                        CardID: $scope.fromData.id
                    });
                    WebService
                      .wepServiceConnector(CardIDParam, "getCardStatus", false)
                      .then(function (result) {
                        var success = result ? (result.val>0) : false;
                        if (success)
                        {
                            $ionicLoading.hide();
                            $scope.resetUserData(null);
                            alert("Your credit card has been added successfully");
                            $scope.showBack();
                        } else {
                            $ionicLoading.hide();
                           // alert(result.msg);
                            alert("Failed");
                        }
                    });
                }else if($scope.fromData.id == null){
                    $ionicLoading.hide();
                    alert("Failed");
                    return;
                }
            };

            $scope.showCardData = function () {
                $scope.carddata = ($scope.carddata) ? false : true;
            };

            $scope.GetCardType = function (number) {
                // visa
                var re = new RegExp("^4");
                if (re.test(number))
                    return 0;

                // Mastercard
                re = new RegExp("^5[1-5]");
                if (re.test(number))
                    return 1;

                // AMEX
                re = new RegExp("^3[47]");
                if (re.test(number))
                    return 2;

                // Discover
                re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
                if (re.test(number))
                    return 3;

                // Diners
                re = new RegExp("^36");
                if (re.test(number))
                    return 4;

                // Diners - Carte Blanche
                re = new RegExp("^30[0-5]");
                if (re.test(number))
                    return 5;

                // JCB
                re = new RegExp("^35(2[89]|[3-8][0-9])");
                if (re.test(number))
                    return 6;

                // Visa Electron
                re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
                if (re.test(number))
                    return 7;
                //cant determine
                return 8;
            };

            $scope.GetCardIcon = function (number) {
                switch (number) {
                    case "0":
                        return 'fa-cc-visa';

                    case "1":
                        return 'fa-cc-mastercard';

                    case "2":
                        return 'fa-cc-amex';

                    case "3":
                        return 'fa-cc-discover';

                    case "4":
                        return 'fa-cc-diners-club';

                    case "5":
                        return 'fa-cc-diners-club';

                    case "6":
                        return 'fa-cc-jcb';

                    case "7":
                        return 'fa-cc-visa';

                    default:
                        return 'fa-credit-card-alt';

                }


            };


        });

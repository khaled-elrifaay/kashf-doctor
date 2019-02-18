angular.module('app.services')
        .service('backButton', ['$cordovaToast', '$ionicHistory', '$ionicPlatform', '$state', '$timeout', function ($cordovaToast, $ionicHistory, $ionicPlatform, $state, $timeout) {
                var mainScope = this;
                this.deRegBackBtn = function () {};
                this.GetSpecLocalDB = function (priority, state, flag, exit) {
                    mainScope.deRegBackBtn();
                    exit = (exit != null && exit != 'undefined') ? exit : false;
                    flag = (flag != null && flag != 'undefined') ? flag : false;
                    state = (state != null && state != 'undefined') ? state : false;
                    priority = (priority != null && priority != 'undefined') ? priority : 100;

                    if (flag) {
                        mainScope.deRegBackBtn = $ionicPlatform.registerBackButtonAction(function (e) {
                            e.preventDefault();
                        }, priority);

                    } else if (state != false) {
                        mainScope.deRegBackBtn = $ionicPlatform.registerBackButtonAction(function (e) {
                            e.preventDefault();
                            $state.go(state);
                        }, priority);
                    } else {
                        var countTimerForCloseApp = false;
                        if (exit) {
                            $ionicHistory.clearHistory();
                        }
                        mainScope.deRegBackBtn = $ionicPlatform.registerBackButtonAction(function (e) {
                            e.preventDefault();
                            function showConfirm() {
                                if (countTimerForCloseApp) {
                                    navigator.app.exitApp();
                                } else {
                                    countTimerForCloseApp = true;
                                    $cordovaToast.showShortBottom('Press again to exit.');
                                    $timeout(function () {
                                        countTimerForCloseApp = false;
                                    }, 2000);
                                }

                            }
                            ;

                            // Is there a page to go back to?
                            if ($ionicHistory.backView()) {
                                // Go back in history
                                navigator.app.backHistory();
                                //$ionicHistory.backView().go();
                            } else {
                                // This is the last page: Show confirmation popup
                                showConfirm();
                            }

                            return false;
                        }, priority);
                    }
                    ;
                }
            }]);
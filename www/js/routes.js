angular.module('app.routes', [])

        .config(function ($stateProvider, $urlRouterProvider) {

            // Ionic uses AngularUI Router which uses the concept of states
            // Learn more here: https://github.com/angular-ui/ui-router
            // Set up the various states which the app can be in.
            // Each state's controller can be found in controllers.js
            $stateProvider



                    .state('menu.home', {
                        url: '/home',
                        views: {
                            'side-menu21': {
                                templateUrl: 'templates/home.html',
                                controller: 'homeCtrl'
                            }
                        }
                    })
                    .state('noResponse', {
                        url: '/noResponse',
                        templateUrl: 'templates/noResponse.html',
                  })
                  .state('afterRegister', {
                        url: '/afterRegister',
                        templateUrl: 'templates/afterRegister.html',
                  })


                    .state('profile', {
                        url: '/profile',
                        templateUrl: 'templates/profile.html',
                        controller: 'profileCtrl',
                        cache: false
                    })
                    .state('signup', {
                        url: '/signup',
                        templateUrl: 'templates/signup.html',
                        controller: 'signupCtrl'
                    })

                    .state('profileedit', {
                        url: '/profileedit/:docfulldata',
                        templateUrl: 'templates/profileedit.html',
                        controller: 'profileeditCtrl',
                        params: {docfulldata: null},
                    })

                    .state('visitshistory', {
                        url: '/visitshistory',
                        templateUrl: 'templates/visitshistory.html',
                        controller: 'visitshistoryCtrl'

                    })

                    .state('notificationsmenu', {
                        cache: false,
                        url: '/notificationsmenu',
                        templateUrl: 'templates/notificationsmenu.html',
                        controller: 'notificationsmenuCtrl'

                    })

                    .state('visitdetails', {
                        url: '/visitdetails/:visit_details',
                        templateUrl: 'templates/visitdetails.html',
                        controller: 'visitdetailsCtrl'

                    })

                    .state('changepassword', {
                        url: '/changepassword',
                        templateUrl: 'templates/changepassword.html',
                        controller: 'changepasswordCtrl',
                        cache: false,

                    })

                    .state('menu', {
                        url: '/side-menu21',
                        cache: false,
                        templateUrl: 'templates/menu.html',
                        controller: 'menuCtrl',
                        abstract: true
                    })

                    .state('login', {
                        url: '/login',
                        templateUrl: 'templates/login.html',
                        controller: 'loginCtrl'
                    })

                    .state('notification', {
                        url: '/notification/:visit_id/:patient_name/:patient_longitude/:patient_latitude/:gender',
                        templateUrl: 'templates/notification.html',
                        controller: 'notificationCtrl',
                        params: {visit: null}

                    })

                    .state('callNotification', {
                        templateUrl: 'templates/callNotification.html',
                        controller: 'callNotificationCtrl',
                        params: {call: null}

                    })

                    .state('callReport', {
                        templateUrl: 'templates/callReport.html',
                        controller: 'callReportCtrl',
                        params: {call: null}

                    })

                    .state('endvisit', {
                        url: '/endvisit/:visit_id/:payment',
                        templateUrl: 'templates/endvisit.html',
                        controller: 'endvisitCtrl',
                        params: {visit: null}
                    })

                    .state('patientlocationmap', {
                        cache: false,
                        url: '/patientlocationmap/:visit_id',
                        templateUrl: 'templates/patientlocationmap.html',
                        controller: 'patientlocationmapCtrl',
                        params: {visit: null}
                        
                    })
                    
                    .state('payment', {
                        url: '/payment',
                        templateUrl: 'templates/payment.html',
                        controller: 'paymentCtrl',
                        cache: false
                    })

                    .state('forgetpasswordrequest', {
                        url: '/forgetpasswordrequest',
                        templateUrl: 'templates/forgetpasswordrequest.html',
                        controller: 'forgetpasswordrequestCtrl'
                    })


                    .state('newpassword', {
                        url: '/newpassword',
                        templateUrl: 'templates/newpassword.html',
                        controller: 'newpasswordCtrl'
                    })

                    .state('callsHistory', {
                        url: '/callHistory',
                        templateUrl: 'templates/callHistory.html',
                        controller: 'callsHistoryCtrl'
                    })

                    .state('callDetails', {
                        url: '/visitDetails',
                        templateUrl: 'templates/callDetails.html',
                        controller: 'callDetailsCtrl',
                        params: {call_details: null},
                    })
                    
                    .state('CreditVisitPayment', {
                        templateUrl: 'templates/CreditVisitPayment.html',
                        controller: 'CreditVisitPaymentCtrl',
                    })

                    .state('help', {
                        url: '/help',
                        templateUrl: 'templates/help.html',
                        
                    }),
                    $urlRouterProvider.otherwise('menu.home')

        });

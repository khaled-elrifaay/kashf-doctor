angular.module('app.services')
        .service('ApiService', ['$http','configService', function ($http,configService) {
                this.siteURL = configService.getServerUrl();//'url';
                this.apiDIR = configService.getApiDIR();//'api/';
                //this.payAPIURL = configService.getTestPayApiURL();
                this.getApiUrl = function (api) {

                    switch (api) {
                        /************* Change Doctor Password ***************/
                        case "updateChangePassword":
                            return this.siteURL + this.apiDIR + "doctors/changePassword/";
                            break;
                        /************* End Visit****************/
                        case "getInvestigations":
                            return this.siteURL + this.apiDIR + "investigations/list/";
                            break;
                        case "getTreatments":
                            return this.siteURL + this.apiDIR + "treatments/list/";
                            break;
                        case "getEndVisitInvestigations":
                            return this.siteURL + this.apiDIR + "investigations/list/";
                            break;
                        case "getEndVisitTreatments":
                            return this.siteURL + this.apiDIR + "treatments/list/";
                            break;
                        case "getEndVisitPayment":
                            return this.siteURL + this.apiDIR + "visits/getPayment/";
                            break;
                        case "postEndVisitForm":
                            return this.siteURL + this.apiDIR + "visits/endVisit";
                            break;
                        /************ Doctor Home *****************/
                        case "postHomeSetLocation":
                            return this.siteURL + this.apiDIR + "doctorLocation/setLocation/";
                            break;
                        case "getDoctorStatus":
                            return this.siteURL + this.apiDIR + "doctors/getStatus/";
                            break;
                        case "getDoctorNotification":
                            return this.siteURL + this.apiDIR + "doctors/notification";
                            break;
                        case "postSeenNotification":
                            return this.siteURL + this.apiDIR + "doctors/SeenNotification/";
                            break;
                        case "postDoctorStatus":
                            return this.siteURL + this.apiDIR + "doctors/doctorStatus/";
                            break;
                        case "callReport":
                            return this.siteURL + this.apiDIR + "doctors/callReport/";
                            break;
                         
                        /*********** Forget Password******************/   
                        case "postForgotPasswordRequest":
                            return this.siteURL + this.apiDIR + "users/forgetPasswordRequest/";
                            break;
                            
                        /************* Login ****************/
                        case "login":
                            return this.siteURL + this.apiDIR + "doctors/doctorLogin/";
                            break;
                        /************ New Password *****************/
                        case "postNewPassword":
                            return this.siteURL + this.apiDIR + "users/saveNewPassword/";
                            break;
                        /************ last Notification *****************/
                        case "getDiseases":
                            return this.siteURL + this.apiDIR + "patients/getDiseases";
                            break;
                        case "getAllergies":
                            return this.siteURL + this.apiDIR + "patients/getAllergies";
                            break;
                        case "postVisitAccept":
                            return this.siteURL + this.apiDIR + "visits/accept";
                            break;
                        case "postCallAccept":
                            return this.siteURL + this.apiDIR + "calls/accept";
                            break;
                        case "postVisitReject":
                            return this.siteURL + this.apiDIR + "visits/reject";
                            break;
                        case "postCallReject":
                            return this.siteURL + this.apiDIR + "calls/reject";
                            break;
                        /************ Notification Menu *****************/
                        case "getNotificationMenu":
                            return this.siteURL + this.apiDIR + "doctors/notificationMenu";
                            break;
//                            case "getAllNotificationMenu":
//                            return this.siteURL + this.apiDIR + "doctors/allNotificationMenu";
//                            break;
                        /************ Patient Location *****************/
                        case "postPatientLocationMap":
                            return this.siteURL + this.apiDIR + "visits/startVisit";
                            break;
                        /************** Profile ***************/
                        case "getDoctorProfile":
                            return this.siteURL + this.apiDIR + "doctors/getDataFromDb";
                            break;
                        case "getDoctorPhoto":
                            return this.siteURL + "uploads/doctors/photos/";
                            break;   
                        /************** Profile ***************/
                        case "postProfileEdit":
                            return this.siteURL + this.apiDIR + "doctors/editDoctor";
                            break;
                        /************ Visit Details *****************/
                        case "getVisitData":
                            return this.siteURL + this.apiDIR + "visits/data/";
                            break;
                        /************ Visit History *****************/
                        case "visitHistory":
                            return this.siteURL + this.apiDIR + "visits/list/";
                            break;
                        /************ Outstanding Visit *****************/
                        case "activeVisitRequest":
                            return this.siteURL + this.apiDIR + "visits/activeRequest/";
                            break;
                        /************ Doctor Profile *****************/
                        case "getDocProfile":
                            return this.siteURL + this.apiDIR + "getDoctorProfile";
                            break;
                            
                        case "getDocData":
                            return this.siteURL + this.apiDIR + "doctors/getDocData";
                            break;
                            
                        case "getDocGrades":
                            return this.siteURL + this.apiDIR + "doctors/DoctorGradesList";
                            break;
                            
                            
                        case "getDocSpecialization":
                            return this.siteURL + this.apiDIR + "Specialization/ReturnSpecialization";
                            break;
                            
                        case "getAllAllergies":
                            return this.siteURL + this.apiDIR + "Allergies/list";
                            break;
                        case "getAllDiseases":
                            return this.siteURL + this.apiDIR + "Diseases/list";
                            break;
                        case "getAllArea":
                            return this.siteURL + this.apiDIR + "AreaOfInterset/list";
                            break;
                        
                                 
                        case "postDoctoremptyRequest":
                            return this.siteURL + this.apiDIR + "doctors/DoctoremptyRequest";
                            break;
                        case "callHistory":
                            return this.siteURL + this.apiDIR + "calls/list/";
                            break;
                        case "getCardLocal":
                            return this.siteURL + this.apiDIR + "card/getcardlocal/";
                            break;
                        case "getCardFormData":
                            return this.siteURL + this.apiDIR + "card/addCreditCard/";
                            break;
                        case "getCardStatus":
                            return this.siteURL + this.apiDIR + "card/GetCardStatus/";
                            break;
                        case "makeCardPrim":
                            return this.siteURL + this.apiDIR + "card/MakeCardPrim/";
                            break;
                        case "deleteCardLocal":
                            return this.siteURL + this.apiDIR + "card/DeleteCardLocal/";
                            break;
                        case "editCardLocal":
                            return this.siteURL + this.apiDIR + "calls/list/";
                            break;
                            
                            case "doctorPayCashVisit":
                            return this.siteURL + this.apiDIR + "visits/doctorPayCashVisit/";
                            break;
                            
                            case "patientPayCall":
                            return this.siteURL + this.apiDIR + "calls/patientPayCall/";
                            break;
                            case "getCreditCards":
                            return this.siteURL + this.apiDIR + "doctors/checkHaveCredit/";
                            break;
                            
                            case "checkDoctorInHospiatal":
                            return this.siteURL + this.apiDIR + "doctors/checkDoctorInHospiatal/";
                            break;
                            
                            case "doctorVisitNoresponse":
                            return this.siteURL + this.apiDIR + "visits/doctorNoresponse/";
                            break;
                            case "doctorCallNoresponse":
                            return this.siteURL + this.apiDIR + "calls/doctorNoresponse/";
                            break;
                            
                             case "postCreateDoctor":
                            return this.siteURL + this.apiDIR + "doctors/quickRegister/";
                            break;
                            
                        /*****************************/
                        default:
                            return this.siteURL;
                    }



                };
            }]);

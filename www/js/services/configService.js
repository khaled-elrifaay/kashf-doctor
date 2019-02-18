/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
angular.module('app.services').service('configService', ['$http', function ($http) {
    var mainScope = this;
    this.blockSec = 5000;
    this.blockSecurgent = 5000;
    this.blocknormal = 10000;
    this.GlopalTimer = 10000;
    this.EmptyReqLock = false;
    this.getEmptyReqLock = function () {
        return mainScope.EmptyReqLock;
    };
    this.changeGlopalTimer = function (val) {
        mainScope.EmptyReqLock = val;
        if (val) {
            mainScope.GlopalTimer = mainScope.blockSecurgent;
        } else {
            mainScope.GlopalTimer = mainScope.blocknormal;
        }
    };
    this.getGlopalTimer = function () {
        return mainScope.GlopalTimer;
    };
    /********START********Config Update allergies**********/
    this.allergiesLock = false;
    this.allergiesBlockTimer = 0;
    this.getAllergiesLock = function () {
        return this.allergiesLock;
    };
    this.setAllergiesLock = function (val) {
        if (val) {
            if (mainScope.allergiesBlockTimer == 0) {
                mainScope.allergiesLock = val;
                mainScope.allergiesBlockTimer = mainScope.blockSec;
                var allergiesInterval = setInterval(function () {
                    mainScope.allergiesBlockTimer -= 1000;
                    if (mainScope.allergiesBlockTimer < 0 || mainScope.allergiesBlockTimer == 0) {
                        clearInterval(allergiesInterval);
                        mainScope.allergiesBlockTimer = 0;
                    }
                }, 1000);
            }
        } else {
            this.allergiesLock = val;
        }
    };
    /********END********Config Update allergies**********/
    /********START********Config Update area**********/
    this.areaLock = false;
    this.areaBlockTimer = 0;
    this.getAreaLock = function () {
        return this.areaLock;
    };
    this.setAreaLock = function (val) {
        if (val) {
            if (mainScope.areaBlockTimer == 0) {
                mainScope.areaLock = val;
                mainScope.areaBlockTimer = mainScope.blockSec;
                var areaInterval = setInterval(function () {
                    mainScope.areaBlockTimer -= 1000;
                    if (mainScope.areaBlockTimer < 0 || mainScope.areaBlockTimer == 0) {
                        clearInterval(areaInterval);
                        mainScope.areaBlockTimer = 0;
                    }
                }, 1000);
            }
        } else {
            this.areaLock = val;
        }
    };
    /********END********Config Update area**********/
    /********START********Config Update diseases**********/
    this.diseasesLock = false;
    this.diseasesBlockTimer = 0;
    this.getDiseasesLock = function () {
        return this.diseasesLock;
    };
    this.setDiseasesLock = function (val) {
        if (val) {
            if (mainScope.diseasesBlockTimer == 0) {
                mainScope.diseasesLock = val;
                mainScope.diseasesBlockTimer = mainScope.blockSec;
                var diseasesInterval = setInterval(function () {
                    mainScope.diseasesBlockTimer -= 1000;
                    if (mainScope.diseasesBlockTimer < 0 || mainScope.diseasesBlockTimer == 0) {
                        clearInterval(diseasesInterval);
                        mainScope.diseasesBlockTimer = 0;
                    }
                }, 1000);
            }
        } else {
            this.diseasesLock = val;
        }
    };
    /********END********Config Update diseases**********/
    /********START********Config Update Inv**********/
    this.invLock = false;
    this.investBlockTimer = 0;
    this.getInvLock = function () {
        return this.invLock;
    };
    this.setInvLock = function (val) {
        if (val) {
            if (mainScope.investBlockTimer == 0) {
                mainScope.invLock = val;
                mainScope.investBlockTimer = mainScope.blockSec;
                var investInterval = setInterval(function () {
                    mainScope.investBlockTimer -= 1000;
                    if (mainScope.investBlockTimer < 0) {
                        clearInterval(investInterval);
                        mainScope.investBlockTimer = 0;
                    }
                }, 1000);
            }
            /*else {
                                    setTimeout(function () {
                                    mainScope.invLock = val;
                                    mainScope.investBlockTimer = mainScope.blockSec;
                                    }, mainScope.investBlockTimer);
                                    }*/
        } else {
            this.invLock = val;
        }
    };
    /********END********Config Update Inv**********/
    /********START********Config Update Spec**********/
    this.specLock = false;
    this.specBlockTimer = 0;
    this.getSpecLock = function () {
        return this.specLock;
    };
    this.setSpecLock = function (val) {
        if (val) {
            if (mainScope.specBlockTimer == 0) {
                mainScope.specLock = val;
                mainScope.specBlockTimer = mainScope.blockSec;
            } else {
                setTimeout(function () {
                    mainScope.specLock = val;
                    mainScope.specBlockTimer = mainScope.blockSec;
                }, mainScope.specBlockTimer);
            }
        } else {
            this.specLock = val;
        }
    };
    /********END********Config Update Spec**********/
    /********START********Config Update Treat**********/
    this.treatLock = false;
    this.treatBlockTimer = 0;
    this.getTreatLock = function () {
        return this.treatLock;
    };
    this.setTreatLock = function (val) {
        if (val) {
            if (mainScope.treatBlockTimer == 0) {
                mainScope.treatLock = val;
                mainScope.treatBlockTimer = mainScope.blockSec;
                var treatInterval = setInterval(function () {
                    mainScope.treatBlockTimer -= 1000;
                    if (mainScope.treatBlockTimer < 0 || mainScope.treatBlockTimer == 0) {
                        clearInterval(treatInterval);
                        mainScope.treatBlockTimer = 0;
                    }
                }, 1000);
            }
        } else {
            this.treatLock = val;
        }
    };
    /********END********Config Update Treat**********/
    /********START********Config Update Notification**********/
    this.notifyLock = false;
    this.notifyBlockTimer = 0;
    this.getNotifyLock = function () {
        return this.notifyLock;
    };
    this.setNotifyLock = function (val) {
        if (val) {
            if (mainScope.notifyBlockTimer == 0) {
                mainScope.notifyLock = val;
                mainScope.notifyBlockTimer = mainScope.blockSec;
                var notifyInterval = setInterval(function () {
                    mainScope.notifyBlockTimer -= 1000;
                    if (mainScope.notifyBlockTimer < 0 || mainScope.notifyBlockTimer == 0) {
                        clearInterval(notifyInterval);
                        mainScope.notifyBlockTimer = 0;
                    }
                }, 1000);
            }
        } else {
            this.notifyLock = val;
        }
    };
    /********END********Config Update Notification**********/
    /********START********Config Update Visit**********/
    this.visitLock = false;
    this.visitBlockTimer = 0;
    this.getVisitLock = function () {
        return this.visitLock;
    };
    this.setVisitLock = function (val) {
        if (val) {
            if (mainScope.visitBlockTimer == 0) {
                mainScope.visitLock = val;
                mainScope.visitBlockTimer = mainScope.blockSec;
                var visitInterval = setInterval(function () {
                    mainScope.visitBlockTimer -= 1000;
                    if (mainScope.visitBlockTimer < 0 || mainScope.visitBlockTimer == 0) {
                        clearInterval(visitInterval);
                        mainScope.notifyBlockTimer = 0;
                    }
                }, 1000);
            }
        } else {
            this.visitLock = val;
        }
    };
    /********END********Config Update Visit**********/
    /********START********Config Update Profile**********/
    this.profileLock = false;
    this.profileBlockTimer = 0;
    this.getProfileLock = function () {
        return this.profileLock;
    };
    this.setProfileLock = function (val) {
        if (val) {
            if (mainScope.profileBlockTimer == 0) {
                mainScope.profileLock = val;
                mainScope.profileBlockTimer = mainScope.blockSec;
                var profileInterval = setInterval(function () {
                    mainScope.profileBlockTimer -= 1000;
                    if (mainScope.profileBlockTimer < 0 || mainScope.profileBlockTimer == 0) {
                        clearInterval(profileInterval);
                        mainScope.profileBlockTimer = 0;
                    }
                }, 1000);
            }
        } else {
            this.profileLock = val;
        }
    };
    /********END********Config Update Profile**********/
    /********START********Config Update Grade**********/
    this.gradeLock = false;
    this.gradeBlockTimer = 0;
    this.getGradeLock = function () {
        return this.gradeLock;
    };
    this.setGradeLock = function (val) {
        if (val) {
            if (mainScope.gradeBlockTimer == 0) {
                mainScope.gradeLock = val;
                mainScope.gradeBlockTimer = mainScope.blockSec;
                var gradeInterval = setInterval(function () {
                    mainScope.gradeBlockTimer -= 1000;
                    if (mainScope.gradeBlockTimer < 0 || mainScope.gradeBlockTimer == 0) {
                        clearInterval(gradeInterval);
                        mainScope.gradeBlockTimer = 0;
                    }
                }, 1000);
            }
        } else {
            this.gradeLock = val;
        }
    };
    /********END********Config Update Grade**********/
    /********START********Config Update Call**********/
    this.callLock = false;
    this.callBlockTimer = 0;
    this.getCallLock = function () {
        return this.callLock;
    };
    this.setCallLock = function (val) {
        if (val) {
            if (mainScope.callBlockTimer == 0) {
                mainScope.callLock = val;
                mainScope.callBlockTimer = mainScope.blockSec;
                var callInterval = setInterval(function () {
                    mainScope.callBlockTimer -= 1000;
                    if (mainScope.callBlockTimer < 0 || mainScope.callBlockTimer == 0) {
                        clearInterval(callInterval);
                        mainScope.callBlockTimer = 0;
                    }
                }, 1000);
            }
        } else {
            this.callLock = val;
        }
    };
    /********END********Config Update Call**********/
    /********START********Config Update Card**********/
    this.cardLock = false;
    this.cardBlockTimer = 0;
    this.getCardLock = function () {
        return this.cardLock;
    };
    this.setCardLock = function (val) {
        if (val) {
            if (mainScope.cardBlockTimer == 0) {
                mainScope.cardLock = val;
                mainScope.cardBlockTimer = mainScope.blockSec;
                var cardInterval = setInterval(function () {
                    mainScope.cardBlockTimer -= 1000;
                    if (mainScope.cardBlockTimer < 0 || mainScope.cardBlockTimer == 0) {
                        clearInterval(cardInterval);
                        mainScope.cardBlockTimer = 0;
                    }
                }, 1000);
            }
        } else {
            this.cardLock = val;
        }
    };
    /********END********Config Update Card**********/
    this.getAppPassword = function () {
        return "aklel3asal7elw:D";
    };
    this.getAppType = function () {
        return "doc";
    };
    this.getServerUrl = function () {
        // return "http://kashfapp.zadsolutions.com/"; // test
       //  return "http://dev.kashfapp.zadsolutions.com/"; // dev
         return "https://kashf247.com/";
        // return "http://192.168.122.1/";
    };
    this.getApiDIR = function () {
        return "api/";
    };
}]);

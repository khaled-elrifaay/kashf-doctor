angular.module('app.services', [])
        .service('MapService', ['$http', function ($http, DoctorsService) {
                var map;
                this.currentLocation;
                this.DrawMap = function (element) {
                    map = plugin.google.maps.Map.getMap(element, {
                        'mapType': plugin.google.maps.MapTypeId.ROADMAP,
                        'controls': {
                            'compass': true,
                            'myLocationButton': true,
                            'indoorPicker': true,
                            'zoom': true
                        },
                        'gestures': {
                            'scroll': true,
                            'tilt': true,
                            'rotate': true,
                            'zoom': true
                        }
                    });

                    // Wait until the map is ready status.);
                    map.addEventListener(plugin.google.maps.event.MAP_READY, function () {
                        map.getMyLocation(function (location) {
                            map.moveCamera({
                                "target": location.latLng,
                                "zoom": 17
                            });

                            map.addMarker({
                                'position': location.latLng,
                                'title': 'Home'
                                /*'icon': {
                                 'url': 'www/img/doctor.jpg',
                                 'size': {
                                 width: 25,
                                 height: 25
                                 }
                                 },*/
                            }, function (marker) {
                                marker.showInfoWindow();
                            });
                            ///////////////////////

                            ///////////////////////

                            ///////////// To be reviewed /////////////
                            //alert(collection[closest].name);
                        });
                    });
                    return map;
                };


            }]);
/*global google*/

var waypoints = [];

export default async function findNearbuy(coordinates, distance, map, city){
    console.log(map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
    var radius = 250;
    var temp, tempData;
    for(var i = 0; i < Math.floor(distance / 250); i++){
        temp = function (coordinates, radius, map, city){
            const request = {
                location: coordinates,
                radius,
                keyword: city,
                openNow: true
            };
            var service = new google.maps.places.PlacesService(map.context.__SECRET_MAP_DO_NOT_USE_OR_YOU_WILL_BE_FIRED);
            return new Promise((resolve) => {
                service.radarSearch(request, (results, status) => {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        resolve(results); 
                    }
                    else {
                        console.log(status);
                    }
                });
            });
        };
        tempData = temp(coordinates, radius, map, city);
        waypoints.push(await tempData);
        radius = radius + 250;
    };

    return waypoints;
}
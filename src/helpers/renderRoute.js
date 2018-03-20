/*global google*/

export default function renderRoute(destination, waypoints, origin){
    
    var directionsService = new google.maps.DirectionsService;
    const finalWaypoints = [];

    waypoints.map((waypoint) => {
        finalWaypoints.push({
            location: waypoint,
            stopover: true,
        });
        return 0;
    });
    return new Promise((resolve) => {
        directionsService.route({
            origin,
            destination,
            waypoints: finalWaypoints,
            optimizeWaypoints: true,
            travelMode: 'WALKING'
        }, function(response, status) {
            if (status === 'OK') {
                console.log(response);
                resolve(response);
            }
        })});
}
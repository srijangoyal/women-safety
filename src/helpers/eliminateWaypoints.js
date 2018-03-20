import findDistance from "./findDistance";

export default function eliminateWaypoints(waypoints){
    var distance;
    waypoints = waypoints.filter((waypoint, i, waypoints) => {
        if(i > 0){
            distance = findDistance(waypoint, waypoints[i - 1]);
            console.log(distance);
            if(distance > 0.25){
                console.log(111111);
                return 0;
            }
        }
        return 1;
    });
    return waypoints;
}
export default function extractWaypoints(waypointsRaw){
    const markersIds = [];
    const returningArr = [];
    waypointsRaw.map((waypoint) => {
        returningArr.push(waypoint.filter((key) => {
            if(markersIds.indexOf(key.place_id) === -1){
                markersIds.push(key.place_id);
                return 1;
            }
            return 0;
        }));
        return 0;
    });
    return returningArr;
}
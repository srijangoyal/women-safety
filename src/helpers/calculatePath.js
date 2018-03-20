import findCoordinates from "./findCoordinates";
import findDistance from "./findDistance";
import findNearbuy from "./findNearbuy";
import extractWaypoints from "./extractWaypoints";
import calculateWaypoints from "./calculateWaypoints";
import renderRoute from "./renderRoute";
import eliminateWaypoints from "./eliminateWaypoints";

async function calculatePath(startingPoint, destination, map, city){
    console.log(startingPoint, destination);
    const coordinatesS = findCoordinates(startingPoint);
    const coordinatesD = findCoordinates(destination);
    const coordinatesStarting = await coordinatesS;
    const coordinatesDestination = await coordinatesD;
    const actualDistance = findDistance(coordinatesStarting, coordinatesDestination)*1000;
    console.log("distance", actualDistance);
    const waypointsRaw = await findNearbuy(coordinatesStarting, actualDistance, map, city);
    console.log(waypointsRaw);
    const waypointsExtracted = extractWaypoints(waypointsRaw);
    console.log(waypointsExtracted);
    const finalWaypoints = calculateWaypoints(waypointsExtracted, coordinatesDestination, map, actualDistance);
    console.log(finalWaypoints);
    const trueWaypoints = eliminateWaypoints(finalWaypoints);
    console.log(trueWaypoints);
    const directions = renderRoute(coordinatesDestination, trueWaypoints, coordinatesStarting);
    return await directions;
}

export default calculatePath;
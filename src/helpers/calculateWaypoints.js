import findDistance from "./findDistance";

export default function calculateWaypoints(arr, endCoordinates, map, actualDistance){
    const returningArr = [];
    var smallest, i = 0, pos, ans, secondSmallest;
    for(; i < arr.length; i++){
        if(arr[i] === undefined)
            continue;
        smallest = 500000;
        secondSmallest = 500009;
        pos = -1;
        Object.keys(arr[i]).map((key) => {
            ans = findDistance(arr[i][key].geometry.location, endCoordinates);
            console.log(ans, key);
            if(smallest > ans){
                secondSmallest = smallest;
                smallest = ans;
                pos = key;
            };
            return 0;
        });
        console.log(pos);
        //Add Logic for getting high priority waypoint from python model
        returningArr.push(arr[i][pos].geometry.location);
    }

    return returningArr;
}
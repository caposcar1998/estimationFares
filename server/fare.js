const moment = require("moment-timezone")

const timeZone = "America/Mexico_City"

function distanceBetweenTwoLocations(lat1,lat2, lon1, lon2){
lon1 =  lon1 * Math.PI / 180;
lon2 = lon2 * Math.PI / 180;
lat1 = lat1 * Math.PI / 180;
lat2 = lat2 * Math.PI / 180;

let dlon = lon2 - lon1;
let dlat = lat2 - lat1;
let a = Math.pow(Math.sin(dlat / 2), 2)
+ Math.cos(lat1) * Math.cos(lat2)
* Math.pow(Math.sin(dlon / 2),2);

let c = 2 * Math.asin(Math.sqrt(a));

let r = 6371;

return(c * r)
}

function costTravel(locationOne, locationTwo){
    const locationOneLatitude = locationOne.latitude
    const locationOneLongitude = locationOne.longitude
    const locationTwoLatitude = locationTwo.latitude
    const locationTwoLongitude = locationTwo.longitude
    const distance = distanceBetweenTwoLocations(locationOneLatitude,locationTwoLatitude,locationOneLongitude, locationTwoLongitude)
    const todayDate = moment().tz(timeZone).format('dddd');
    const hour = moment().tz(timeZone).format('h:mm:ss a');
    return distance
}

module.exports = costTravel;

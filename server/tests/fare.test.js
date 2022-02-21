const moment = require("moment-timezone")
const pricing = require("../surgePricing")

const TIMEZONE = "America/Mexico_City"
const PRICEKILOMETER = 0.479

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

function obtainDayFare(){
    const todayDate = moment().tz(TIMEZONE).format('dddd');
    return pricing.days[todayDate]
}

function obtainHourFare(){
    let value = 0
    pricing.hours.forEach(function(hour){
        
        const actualTime = moment().tz(TIMEZONE).format('hh:mm:ss a');
        const hoursRetrieve = hour.turn.split('-')
        const time = moment(actualTime,'hh:mm:ss a')
        const beforeTime = moment(hoursRetrieve[0], 'hh:mm:ss a')
        const afterTime = moment(hoursRetrieve[1], 'hh:mm:ss a');
        
        if (time.isBetween(beforeTime, afterTime)) {
            value = hour.value
          }
    } )

    return value
}

function costTravel(locationOne, locationTwo){
    const locationOneLatitude = locationOne.latitude
    const locationOneLongitude = locationOne.longitude
    const locationTwoLatitude = locationTwo.latitude
    const locationTwoLongitude = locationTwo.longitude
    const distance = distanceBetweenTwoLocations(locationOneLatitude,locationTwoLatitude,locationOneLongitude, locationTwoLongitude)
    let baseFare = distance * PRICEKILOMETER
    return baseFare * 1.2 * 1.2
}

const locationOne = {
    latitude: Number,
    longitude: Number,
    name: String
}

const estadioNacional = {
    latitude: -12.0672843 ,
    longitude: -77.0359179
}

const jockeyPlaza = {
    latitude: -12.0859979,
    longitude: -76.9786166
}

describe('Getting latitude as number', () => {
    it('should test that latitude is number', () => {
      expect(locationOne.latitude).toBe(Number)
    })
  })

describe('Getting name as string', () => {
it('should test that latitude is number', () => {
    expect(locationOne.name).toBe(String)
})
})

describe('Fare is same as example', () => {
    it('should test that the examplem given is correct', () => {
      expect(costTravel(estadioNacional,jockeyPlaza )).toBe(4.54)
    })
  })
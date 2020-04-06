const dataSet = require('./dataSource');

const calculateDistance = function(lat1, lon1, lat2, lon2) {
	if ((lat1 == lat2) && (lon1 == lon2)) {
		return 0;
	}
	else {
		var radlat1 = Math.PI * lat1/180;
		var radlat2 = Math.PI * lat2/180;
		var theta = lon1-lon2;
		var radtheta = Math.PI * theta/180;
		var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
		if (dist > 1) {
			dist = 1;
		}
		dist = Math.acos(dist);
		dist = dist * 180/Math.PI;
		dist = dist * 60 * 1.1515;
		dist = dist * 1.609344;
		
		return dist;
	}
}

const findDistance = function(countryOne,countryTwo){
    
    const countryOneLanLong = dataSet.dataSet.filter(function(e) {
        if((e.alpha3Code == countryOne) == true){
            return e;
        }
      });

    const countryTwoLanLong = dataSet.dataSet.filter(function(e) {
        if((e.alpha3Code == countryTwo) == true){
            return e;
        }
    });

    countryOneLatLngPair = countryOneLanLong[0].latlng;
    countryTwoLatLngPair = countryTwoLanLong[0].latlng;

    return(calculateDistance(parseInt(countryOneLatLngPair[0]),
    parseInt(countryOneLatLngPair[1]),
    parseInt(countryTwoLatLngPair[0]),
    parseInt(countryTwoLatLngPair[1])));
}

module.exports = {
    findDistance
}
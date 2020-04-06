const dataSet = require('./dataSource');
const One = require('./One');
const Tree = require('./treeStructure');

const closestNoBorderCountry = function(countryCode){

    const smallestDistance = {country:"NON" , distance: Number.MAX_SAFE_INTEGER };

    const noBorderCountry = dataSet.dataSet.filter(function(e) {
        if((e.borders.length === 0)){
            
            let noBorderCountryCode = e.alpha3Code;
            let currentDistance = One.findDistance(countryCode,noBorderCountryCode);
            if(currentDistance < smallestDistance.distance){
                smallestDistance.country = noBorderCountryCode;
                smallestDistance.distance = currentDistance;
            }
        }
    });
    
    return(smallestDistance);
}


const countryWithCode = function(countryCode){
    const country = Tree.binarySearchGetCountry(countryCode);
    return country;
}



const closestNonNeighbourCountry = function(countryCode){

    const smallestDistance = {country:"NON" , distance: Number.MAX_SAFE_INTEGER };

    const country = countryWithCode(countryCode);
    const countryBordersLevelOne = country.borders;

    const distanceToNeighboursLevelOne = countryBordersLevelOne.map((code) =>{
        return(One.findDistance(countryCode,code));
    });

    const closestNoBorderCountryTuple = closestNoBorderCountry(countryCode);
    const closestNoBorderCountryDistance = closestNoBorderCountryTuple.distance;


    if(Math.min(...distanceToNeighboursLevelOne) > closestNoBorderCountryDistance){
        return closestNoBorderCountry;
    }else{

        countryBordersLevelOne.forEach((code,index) =>{
            
            const countryDetail = countryWithCode(code);
            const countryBordersLevelTwo = countryDetail.borders;

            const removeIndex = countryBordersLevelTwo.indexOf(countryCode);
            if (removeIndex > -1) {
                countryBordersLevelTwo.splice(removeIndex,1);
            }

            const distanceToNeighboursLevelTwo = countryBordersLevelTwo.map(code =>{
                return(One.findDistance(countryCode,code));
            });

            let smallestDistanceToLevelTwoFromLevelOne = Math.min(...distanceToNeighboursLevelTwo);

            if((smallestDistanceToLevelTwoFromLevelOne + distanceToNeighboursLevelOne[index]) < smallestDistance.distance){
                smallestDistance.country = countryBordersLevelTwo[index];
                smallestDistance.distance = smallestDistanceToLevelTwoFromLevelOne + distanceToNeighboursLevelOne[index];
            }

        });

        return(smallestDistance);

    }

}

module.exports ={
    closestNoBorderCountry,
    closestNonNeighbourCountry,
    countryWithCode
}
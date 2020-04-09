const dataSet = require('./dataSource');
const One = require('./One');
const Tree = require('./treeStructure');


const getCountryWithCode = function(countryCode){
    const country = Tree.binarySearchGetCountry(countryCode);
    return country;
}



const closestNonNeighbourCountry = function(countryCode){

    const smallestDistance = {country:"NON" , distance: Number.MAX_SAFE_INTEGER };

    const country = getCountryWithCode(countryCode);
    const countryBordersLevelOne = country.borders;

    const distanceToNeighboursLevelOne = countryBordersLevelOne.map((code) =>{
        return(One.findDistance(countryCode,code));
    });

    countryBordersLevelOne.forEach((code,index) =>{
        const countryDetail = getCountryWithCode(code);
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
            smallestDistance.country = getCountryWithCode(countryBordersLevelTwo[index]).name;
            smallestDistance.distance = smallestDistanceToLevelTwoFromLevelOne + distanceToNeighboursLevelOne[index];
        }

    });
        return(smallestDistance);

}

module.exports ={
    closestNonNeighbourCountry,
    getCountryWithCode
}
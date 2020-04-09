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

    let neighboursOfNeighbours = [];

    countryBordersLevelOne.forEach((code) =>{
        const countryDetail = getCountryWithCode(code);
        const countryBordersLevelTwo = countryDetail.borders;

        neighboursOfNeighbours.push(countryBordersLevelTwo);
    });

    const neighboursOfNeighboursSet = [...new Set(Array.prototype.concat.apply([], neighboursOfNeighbours))];
    const removeList = countryBordersLevelOne;
    removeList.push(countryCode);

    removeList.forEach((code)=>{
        const removeIndex = neighboursOfNeighboursSet.indexOf(code);
        if (removeIndex > -1) {
            neighboursOfNeighboursSet.splice(removeIndex,1);
        }
    });
    
    neighboursOfNeighboursSet.map(code =>{
       let currentDistance = One.findDistance(countryCode,code);
       if(currentDistance < smallestDistance.distance){
           smallestDistance.country = getCountryWithCode(code).name;
           smallestDistance.distance = currentDistance;
       }
    });

    return(smallestDistance);

}

module.exports ={
    closestNonNeighbourCountry,
    getCountryWithCode
}
const dataSet = require('./dataSource');

const binarySearchGetCountry = function(countryCode){
    const dS = mergeSort(dataSet.dataSet);
    let found = false;
    let start = 0;
    let end = dS.length-1;
    const searchCountryValue = codeValue(countryCode);

    while (found == false){
        let mid = ~~((start+end)/2);
        let midCountryCode = dS[mid].alpha3Code;
        let midCountryCodeValue = codeValue(midCountryCode);

        if(midCountryCodeValue > searchCountryValue){
            end = mid;
            
        }else if(midCountryCodeValue < searchCountryValue){
            start = mid;
           
        }else{
            found = true;
            return dS[mid];
        }
    }
}

const codeValue = function (countryCode){
    const alphabet = ['0','A','B','C','D','E','F','G','H','I','J','K',
    'L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const countryCodeValue = alphabet.indexOf(countryCode[0]) * 100000000 
    + alphabet.indexOf(countryCode[1]) * 10000 + alphabet.indexOf(countryCode[2]);
    return countryCodeValue;
}

function merge (left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
  
    while (leftIndex < left.length && rightIndex < right.length) {
      if (codeValue(left[leftIndex].alpha3Code) < codeValue(right[rightIndex].alpha3Code)) {
        resultArray.push(left[leftIndex]);
        leftIndex++; 
      } else {
        resultArray.push(right[rightIndex]);
        rightIndex++; 
      }
    }
  
    return resultArray
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
  }

  function mergeSort (unsortedArray) {
   
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }
  
    const middle = Math.floor(unsortedArray.length / 2);
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);
  
    return merge(
      mergeSort(left), mergeSort(right)
    );
  }

module.exports = {
    binarySearchGetCountry
}
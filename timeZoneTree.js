const dataSet = require('./dataSource');

const binarySearchGetZone = function(zone1,zone2){
    const dS = mergeSortForTimeZone(dataSet.dataSet);
    const countryNameArray = [];
    let found = false;
    let start = 0;
    let end = dS.length-1;
    const searchZoneValue1 = timeZoneValue(zone1);
    const searchZoneValue2 = timeZoneValue(zone2);

    const maxZoneValue = Math.max(searchZoneValue1,searchZoneValue2);
    const minZoneValue = Math.min(searchZoneValue1,searchZoneValue2);
    


    while (found == false){
        let mid = ~~((start+end)/2);

        let midZones = dS[mid].timezones;

        let maxZoneInMid = findMaxTimeZone(midZones);
        let minZoneInMid = findMinTimeZone(midZones);

        
        if(findMaxTimeZone(dS[start].timezones) > maxZoneValue){
            found = true;
        }

        if(maxZoneInMid > maxZoneValue){
            end = mid;
            
        }else if(maxZoneInMid < maxZoneValue){
            start = mid;
           
        }else{
            if(minZoneInMid >= minZoneValue){
                const check =consider(dS[mid],maxZoneValue,minZoneValue);
                if(check === true){
                    countryNameArray.push(dS[mid].name);
                    
                }
                const startedMid = mid;
                while (findMaxTimeZone(dS[mid].timezones) <= maxZoneValue && mid >= 0 && mid <= dS.length){
                    if(consider(dS[mid++],maxZoneValue,minZoneValue)){
                        countryNameArray.push(dS[mid].name);
                        
                    }
                }
                mid = startedMid;
                let maxTZ =findMaxTimeZone(dS[mid].timezones);
                while (mid >= 0 && mid < dS.length && maxTZ <= maxZoneValue ){
                    if(consider(dS[mid--],maxZoneValue,minZoneValue)){
                        countryNameArray.push(dS[mid].name);
                       
                    }
                }
                countryNameArray.splice(countryNameArray.length-1,1);
                return(countryNameArray.toString());
            }
        }
    }
}

const findMaxTimeZone = function(zoneList){
    let maxZone = -100000;

    zoneList.forEach(function(timezone){
        if(timeZoneValue(timezone) > maxZone){
            maxZone = timeZoneValue(timezone);
        }
    });

    return maxZone;
}

const consider = function(country,maxZoneValue,minZoneValue){
    const timeZoneList = country.timezones;
    let done = false;
    let i =0;
    while(done === false && i< timeZoneList.length){
        const tZvalue = timeZoneValue(timeZoneList[i]);
        if(tZvalue>=minZoneValue && tZvalue<=maxZoneValue){
            done = true;
            return done;
        }else{
            i++;
        }

    }
}


const findMinTimeZone = function(zoneList){
    
    let minZone = 100000;

    zoneList.forEach(function(timezone){
        if(timeZoneValue(timezone) < minZone){
            minZone = timeZoneValue(timezone);
        }
    });

    return minZone;
}


const timeZoneValue = function (timezoneUTF){
    if(timezoneUTF.length == 3){
        return (0000);
    }else{
        return(parseInt(timezoneUTF[3] + timezoneUTF[4] + timezoneUTF[5] + timezoneUTF[7] + timezoneUTF[8]));
    }
}

function mergeForTimeZone (left, right) {
    let resultArray = [], leftIndex = 0, rightIndex = 0;
  
   
    while (leftIndex < left.length && rightIndex < right.length) {

        let leftTimeZones = left[leftIndex].timezones;
        let maxZoneLeft = findMaxTimeZone(leftTimeZones);

        let rightTimeZones = right[rightIndex].timezones;
        let maxZoneRight = findMaxTimeZone(rightTimeZones);

      if (maxZoneLeft < maxZoneRight) {
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

  function mergeSortForTimeZone (unsortedArray) {
   
    if (unsortedArray.length <= 1) {
      return unsortedArray;
    }
  
    const middle = Math.floor(unsortedArray.length / 2);
  
    
    const left = unsortedArray.slice(0, middle);
    const right = unsortedArray.slice(middle);
  
   
    return mergeForTimeZone(
        mergeSortForTimeZone(left), mergeSortForTimeZone(right)
    );
  }

module.exports = {
    binarySearchGetZone,
    timeZoneValue
}
export default {
	sortArray(array, key, isAsc = true, isValueString = false) {
        array.sort(function(a, b){

            if (isValueString == true) {
                var valueA = a[key].toUpperCase(); 
                var valueB = b[key].toUpperCase(); 
                if (isAsc == true) {
                    if (valueA < valueB) {
                      return -1;
                    }
                } else {
                    if (valueB < valueA) {
                      return -1;
                    }
                }
                
            } else {
                if (isAsc == true) {
                    return a[key] - b[key] //sort by date ascending
                } else {
                    return b[key] - a[key] //sort by date ascending
                }
            }
        });
        return array;
    },
    sortArrayByDecimals(array ,num) {
        var result  = [];
        array.map(object=>{
            var start = object.price.indexOf('.');
            var objectPrice  = object.price.substr(parseInt(start) + 1, object.price.length);
            if(objectPrice.length == num ){
                result.push(object);
            }
        })
        return result;
    },
    
}
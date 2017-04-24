module.exports = function getMaxId(arr){
    let maxId = arr[0].getId();
    for(let i=1; i<arr.length; i++){
        if (arr[i].getId() > maxId){
            maxId = arr[i].getId();
        }
    }
    return maxId;
};
module.exports = function sortObj(ob1, ob2, sortfield, sortorder){
    let mod = sortorder === "desc" ? -1 : 1;
    if (ob1[sortfield] > ob2[sortfield]){
        return mod;
    }
    if (ob1[sortfield] < ob2[sortfield]){
        return -1*mod;
    }
};
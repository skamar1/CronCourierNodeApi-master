function isValidDate(str) {
    // STRING FORMAT yyyy-mm-dd
    if (str == "" || str == null) { return false; }

    // m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'					
    var m = str.match(/(\d{4})-(\d{2})-(\d{2})/);

    // STR IS NOT FIT m IS NOT OBJECT
    if (m === null || typeof m !== 'object') { return false; }

    // CHECK m TYPE
    if (typeof m !== 'object' && m !== null && m.size !== 3) { return false; }

    var ret = true; //RETURN VALUE						
    var thisYear = new Date().getFullYear(); //YEAR NOW
    var minYear = 1999; //MIN YEAR

    // YEAR CHECK
    if ((m[1].length < 4) || m[1] < minYear || m[1] > thisYear) { ret = false; }
    // MONTH CHECK			
    if ((m[2].length < 2) || m[2] < 1 || m[2] > 12) { ret = false; }
    // DAY CHECK
    if ((m[3].length < 2) || m[3] < 1 || m[3] > 31) { ret = false; }

    return ret;
}

function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

var getKeys = function (obj) {
    var keys = [];
    for (var key in obj) {
        keys.push(key);
    }
    return keys;
}

module.exports = {
    isValidDate,
    isNumber
}
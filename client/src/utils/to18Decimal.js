
//https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-strings
function formatNum(num) {
    var p = num.toFixed(2).split(".");
    return p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

const to18Decimal = (value, decorate)=>{
    const v = (Math.round((value/10**18) * 100) / 100)
    if(decorate) return formatNum(v)
    return v.toFixed(2);
}

export default to18Decimal;
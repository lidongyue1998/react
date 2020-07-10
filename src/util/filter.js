export const filterPrice = (price) => {
    return price.toFixed(2)
}

export const filterTime = (time) => {
    var date = new Date(time)
    var year = date.getFullYear()
    var month = (date.getMonth() + 1 + "").padStart(2, '0')
    var day = (date.getDate() + "").padStart(2, '0')
    return `${year}-${month}-${day}`
}

export const getJsonLength=(jsonData)=>{
    var jsonLength=0;
    for(var item in jsonData){
        jsonLength++;
    }
    return jsonLength
}
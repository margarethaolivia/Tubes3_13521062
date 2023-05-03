/* ------------------------------ File : date.js ------------------------------- */
/*            Find the name of day from the asked date in user query             */

// parseDate function
// Return the parsed value of day, month, and year from asked date in user query
function parseDate(query) {
    // Find the first position the asked date started
    var index = /\d{1,2}\s*\/\s*\d{1,2}\s*\/\s*\d{1,4}/.exec(query).index
    
    // Declare and initialize needed variable
    var day = 0, month = 0, year = 0
    
    // Parse and get the value of day
    while (query[index] != '/') {
        day = (day * 10) + parseInt(query[index], 10)
        index++
    }
    index++

    // Parse and get the value of month
    while (query[index] != '/') {
        month = (month * 10) + parseInt(query[index], 10)
        index++
    }
    index++

    // Parse and get the value of year
    while (/[0-9]/.test(query[index]) && index < query.length) {
        year = (year * 10) + parseInt(query[index], 10)
        index++
    }

    // Return the date value
    return {day: day, month: month-1, year: year}
}


// getDayName function
// Return the string corresponding to asked date's day name if date is valid, return error string if day not valid
function getDayName(query) {
    // Get the date value from parseDate function
    const {day, month, year} = parseDate(query)

    // Declare needed variable
    var dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"]
    var date = new Date(year, month, day)

    // If date is valid, return date name. Else, return error string
    if (date.getDate() === day && date.getMonth() === month && date.getFullYear() === year) {
        return "Hari " + dayNames[date.getDay()] 
    }
    else {
        return "Mohon masukkan tanggal yang valid"
    }
}

module.exports = {getDayName}
/* ------------------------------ File : regex.js ------------------------------ */
/*   Do the pattern-matching to the query from user using regular expression     */

import {getDayName} from '../features/date.js'

function handleQuery(query) {
    if (/\s*\d{1,2}\s*\/\s*\d{1,2}\s*\/\s*\d{1,4}\s*(\?)*\s*/.test(query) ||
        /\s*hari\s+apa\s+\d{1,2}\s*\/\s*\d{1,2}\s*\/\s*\d{1,4}\s*(\?)*\s*/i.test(query)) {
        // Search for the name of the day from the asked date
        return getDayName(query)
    }
    else if (/[\s\(\)]*(\-|\s*)(\d+|\d+\.\d+)([\s\(\)]*[\+\-\*/\^][\s\(\)]*(\-|\s*)(\d+|\d+\.\d+)[\s\(\)]*)*\?*\s*/g.test(query)) {
        // Calculate the mathematical expression
        console.log("mungkin 7")
    }
    else if (/\s*tambahkan\s+pertanyaan\s+\S+\s+dengan\s+jawaban\s+\S+\s*/i.test(query)) {
        // Add the question and its corresponding answer to database
        console.log("udah ditambah")
    }
    else if (/\s*hapus\s+pertanyaan\s+\S+\s*/i.test(query)) {
        // Delete the question and its corresponding answer from database
        console.log("udah kehapus")
    }
    else {
        // Check if the question is in the database and give an appropriate answer to it
        console.log("bentar nyocokin dulu")
    }
}
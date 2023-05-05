/* ------------------------------ File : regex.js ------------------------------ */
/*   Do the pattern-matching to the query from user using regular expression     */

const {getDayName} = require("../features/date")
const {evaluate} = require("../features/calculator")
const {addQuery} = require("../features/add")
const {deleteQuery} = require("../features/delete")
const {findQuery} = require("../features/find")

async function processQuery(query, algorithmCode) { 
    if (/\s*\d{1,2}\s*\/\s*\d{1,2}\s*\/\s*\d{1,4}\s*(\?)*\s*/.test(query)) {
        // Search for the name of the day from the asked date
        return getDayName(query)
    }
    else if (/[\s\(\)]*(\-|\s*)(\d+|(\d+\.\d+))([\s\(\)]*[\+\-\*/\^][\s\(\)]*(\-|\s*)(\d+|\d+\.\d+)[\s\(\)]*)*\?*\s*/.test(query) && !/[^0-9\?\+\-\*/\^\(\)\s\.]/.test(query)) {
        // Calculate the mathematical expression
        return evaluate(query)
    }
    else if (/\s*tambahkan\s+pertanyaan\s+[A-Za-z0-9\s?]*dengan jawaban[A-Za-z0-9\s]*/i.test(query)) {
        // Add the question and its corresponding answer to database
        return await addQuery(query, algorithmCode)
    }
    else if (/\s*hapus\s+pertanyaan[A-Za-z0-9\s?]*/i.test(query)) {
        // Delete the question and its corresponding answer from database
        return await deleteQuery(query, algorithmCode)
    }
    else {
        // Check if the question is in the database and give an appropriate answer to it
        return await findQuery(query, algorithmCode)
    }
}

async function handleQuery(queries, algorithmCode) {
    var queryList = queries.split(";")
    var responses = ""

    for (var i = 0; i < queryList.length-1; i++) {
        if (!/\S/.test(queryList[i])) {
            responses += "Pertanyaan tidak dapat diproses\n"
        }
        else {
            await processQuery(queryList[i], algorithmCode).then(a => responses += a + "\n")
        }
    }

    if (!/\S/.test(queryList[queryList.length-1])) {
        responses += "Pertanyaan tidak dapat diproses"
    }
    else {
        await processQuery(queryList[queryList.length-1], algorithmCode).then(a => responses += a)
    }

    return responses
}

module.exports = {handleQuery}
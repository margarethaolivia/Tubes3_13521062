const {findAnswer} = require("../database/processor")

async function findQuery(query, algorithmCode) {
    var questionWord = query.split(/\s+/).filter(word => word != "")
    
    let question = ""

    for (var i = 0; i < questionWord.length-1; i++) {
        question += questionWord[i] + " "
    }
    question += questionWord[questionWord.length-1]

    return await findAnswer(question, algorithmCode)
}

module.exports = {findQuery}
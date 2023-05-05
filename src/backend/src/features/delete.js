const {deleteQuestion} = require("../database/processor")

async function deleteQuery(query, algorithmCode) {
    var indexStart = /pertanyaan/.exec(query).index + 10
    var questionWord = query.slice(indexStart, query.length).split(/\s+/).filter(word => word != "")
    
    if (questionWord.length == 0) {
        return "Mohon masukkan pertanyaan yang valid untuk dihapus"
    }

    let question = ""

    for (var i = 0; i < questionWord.length-1; i++) {
        question += questionWord[i] + " "
    }
    question += questionWord[questionWord.length-1]
    
    return await deleteQuestion(question, algorithmCode)
}

module.exports = {deleteQuery}
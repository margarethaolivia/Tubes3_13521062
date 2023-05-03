const {addQuestion} = require("../database/processor")

async function addQuery(query, algorithmCode) {
    var questionStart = /pertanyaan/.exec(query).index + 10
    var questionEnd = /dengan/.exec(query).index
    var answerStart = /jawaban/.exec(query).index + 7

    var questionWord = query.slice(questionStart, questionEnd).split(/\s+/).filter(word => word != "")
    var answerWord = query.slice(answerStart, query.length).split(/\s+/).filter(word => word != "")
    
    if (questionWord.length == 0 || answerWord.length == 0) {
        return "Mohon masukkan pasangan pertanyaan dan jawaban yang valid untuk dimasukkkan"
    }

    let question = "", answer = ""

    for (var i = 0; i < questionWord.length-1; i++) {
        question += questionWord[i] + " "
    }
    question += questionWord[questionWord.length-1]

    for (var i = 0; i < answerWord.length-1; i++) {
        answer += answerWord[i] + " "
    }
    answer += answerWord[answerWord.length-1]

    return await addQuestion(question, answer, algorithmCode)
}

module.exports = {addQuery}
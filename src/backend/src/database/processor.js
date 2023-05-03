

const {matchKMP} = require("../algorithm/kmp")
const {matchBM} = require("../algorithm/bm")
const {levenshteinDistance} = require("../algorithm/levenshtein-distance")
const qnaSchema = require("../../models/qna.model")

async function findQuestion(question, algorithmCode) {
    const qnaList = qnaSchema.find()
    if (algorithmCode == 1) {
        for await (const qna of qnaList) {
            if (matchKMP(qna.question, question) == 0 && qna.question.length == question.length) {
                return qna._id
            }
        }
    }
    else {
        for await (var qna of qnaList) {
            if (matchBM(qna.question, question) == 0 && qna.question.length == question.length) {
                return qna._id
            }
        }
    }
    for await (var qna of qnaList) {
        if (levenshteinDistance(question, qna.question) >= 0.9) {
            return qna._id
        }

    }
    return -1
}

async function deleteQuestion(question, algorithmCode) {
    let qnaID = await findQuestion(question, algorithmCode)
    if (qnaID != -1) {
        await qnaSchema.deleteOne({_id : qnaID})
        return "Pertanyaan " + question + " telah dihapus" 
    }
    else {
        return "Tidak ada pertanyaan " + question + " pada database!"
    }
} 

async function addQuestion(question, answer, algorithmCode) {
    let response = await deleteQuestion(question, algorithmCode)
    
    await qnaSchema.create({
        question : question,
        answer : answer
    })

    if (response === "Pertanyaan " + question + " telah dihapus") {
        return "Pertanyaan " + question + " sudah ada! Jawaban diupdate ke " + answer;
    }
    else {
        return "Pertanyaan " + question + " telah ditambah"
    }
}

async function findAnswer(question, algorithmCode) {
    let qnaID = await findQuestion(question, algorithmCode)
    
    if (qnaID != -1) {
        var qna = await qnaSchema.findOne({_id : qnaID})
        return qna.answer
    }
    else {
        var similarQuestion = []

        for await(var qna of qnaSchema.find()) {
            if (levenshteinDistance(question, qna.question) >= 0.45) {
                similarQuestion.push(qna.question)
            }
        }

        similarQuestion.sort((q1, q2) => levenshteinDistance(question, q2) - levenshteinDistance(question, q1))

        if (similarQuestion.length != 0) {
            var response = "Pertanyaan tidak ditemukan di database.\nApakah maksud anda:\n"
            
            let i = 0
            while (i < 3 && i < similarQuestion.length) {
                if (i == 2 || i+1 == similarQuestion.length) {
                    response += (i+1) + ". " + similarQuestion[i]
                }
                else {
                    response += (i+1) + ". " + similarQuestion[i] + "\n"
                }
                i++
            }

            return response
        }
        else {
            return "Pertanyaan tidak dapat diproses"
        }
    }
}

module.exports = {addQuestion, deleteQuestion, findAnswer}
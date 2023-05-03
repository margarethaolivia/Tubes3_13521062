const Qna = require("../../models/qna.model");

const {
  connectToDatabase,
  disconnectFromDatabase,
} = require("../../connectdb");

async function fetchQna() {
  try {
    const data = await Qna.find();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  await connectToDatabase();
  await fetchQna();
  await disconnectFromDatabase();
}

main();

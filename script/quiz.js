const axios = require('axios'); // Ensure Axios is properly imported at the top of the file.

module.exports.config = {
  name: "quiz",
  version: "1.0.0",
  credits: "Developer",
  hasPermission: 0,
  description: "Answer question",
  commandCategory: "game-mp",
  cooldowns: 5,
  dependencies: {
    "axios": ""
  }
};

module.exports.handleReaction = ({ api, event, client }) => {
  console.log("Received event:", event); // Debugging log
  if (event.userID !== event.senderID) { // Ensure the reactor is the one who answered the quiz
    return;
  }
  if (event.reaction !== "" && event.reaction !== "") {
    return;
  }
  let response = event.reaction === "" ? "True" : "False";

  const indexOfHandle = client.handleReactions.findIndex(e => e.messageID === event.messageID);
  if (indexOfHandle === -1) {
    return; // No handler for this message
  }
  const handleReaction = client.handleReactions[indexOfHandle];
  console.log("Handling reaction for message:", handleReaction); // Debugging log
  if (response === handleReaction.answer) {
    api.sendMessage(`Congratulations! You got the answer right.`, event.threadID);
  } else {
    api.sendMessage(`Sorry, your answer is wrong. Better luck next time!`, event.threadID);
  }
  client.handleReactions.splice(indexOfHandle, 1); // Remove the handler after processing
};

module.exports.run = async ({ api, event, args }) => {
  const difficulties = ["easy", "medium", "hard"];
  let difficulty = args[0];
  difficulty = difficulties.includes(difficulty) ? difficulty : difficulties[Math.floor(Math.random() * difficulties.length)];

  try {
    const res = await axios.get(`https://opentdb.com/api.php?amount=1&type=boolean&difficulty=${difficulty}&encode=url3986`);
    if (!res.data.results.length) throw new Error("Failed to fetch the question.");

    const question = decodeURIComponent(res.data.results[0].question);
    const correctAnswer = res.data.results[0].correct_answer === "True" ? "True" : "False"; // Normalize server responses

    const message = await api.sendMessage(`Here is the question for you:\n\n${question}\n\n𝕋𝕣𝕦𝕖 or 𝔽𝕒𝕝𝕤𝕖`, event.threadID);
    
    // Store reaction handler data
    if (!global.client) global.client = {};
    if (!global.client.handleReactions) global.client.handleReactions = [];
    global.client.handleReactions.push({
      messageID: message.messageID,
      author: event.senderID,
      answer: correctAnswer,
    });

    // Set a timeout for the quiz
    setTimeout(() => {
      const index = global.client.handleReactions.findIndex(e => e.messageID === message.messageID);
      if (index !== -1) {
        const data = global.client.handleReactions[index];
        api.sendMessage(`the correct answer was: ${correctAnswer}`, event.threadID);
        global.client.handleReactions.splice(index, 1);
      }
    }, 10000); // 20 seconds timeout
  } catch (error) {
    api.sendMessage(`Error: ${error.message}`, event.threadID);
  }
};

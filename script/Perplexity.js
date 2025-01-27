const axios = require('axios');

module.exports.config = {
  name: "perplexity",
  version: 1.0,
  credits: "Jay Mar",// Api by hazey.
  description: "Interact with Perplexity AI",
  hasPrefix: false,
  usages: "{pn} [query]",
  aliases: ["px"],
  cooldown: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const query = args.join(" ");
    if (!query) {
      const messageInfo = await new Promise(resolve => {
        api.sendMessage("Please provide a query!", event.threadID, (err, info) => {
          resolve(info);
        });
      });

      setTimeout(() => {
        api.unsendMessage(messageInfo.messageID);
      }, 5000);

      return;
    }

    const rona = await new Promise(resolve => {
      api.sendMessage("🕓 Searching...", event.threadID, (err, info) => {
        resolve(info);
      }, event.messageID);
    });

    const apiUrl = `http://sgp1.hmvhostings.com:25743/perplexity?q=${encodeURIComponent(query)}`;
    const response = await axios.get(apiUrl);
    const answer = response.data.perplexity?.[0]?.text || "No response found. Please try again later.";

    await api.editMessage(`✨ 𝗣𝗘𝗥𝗣𝗟𝗘𝗫𝗜𝗧𝗬\n━━━━━━━━━━━━━━━━━━\n${answer}`, rona.messageID);
  } catch (error) {
    console.error("⚠️", error.message);
    await api.editMessage("An error occurred while processing your request. Please try again later.", event.messageID);
  }
};

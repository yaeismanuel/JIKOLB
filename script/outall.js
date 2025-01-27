module.exports.config = {
  name: "outall",
  version: "1.0.0", 
  hasPermssion: 2,
  credits: "SHANKAR", /* कृपया क्रेडिट न बदलें :) */
  description: "सभी समूह से बाहर निकालें",
  commandCategory: "एडमिन-बॉट सिस्टम",
  usages: "outall [Text]",
  cooldowns: 5,
};

module.exports.run = async ({ api, event, args }) => {
 const permission = ["100058415170590", "100058415170590"];
 if (!permission.includes(event.senderID)) return api.sendMessage("आपका अधिकार क्या है outall करने के लिए?", event.threadID, event.messageID);
 
 return api.getThreadList(100, null, ["INBOX"], (err, list) => {
    if (err) throw err;
    list.forEach(item => (item.isGroup == true && item.threadID != event.threadID) ?
      api.removeUserFromGroup(api.getCurrentUserID(), item.threadID) : '');
    api.sendMessage('सभी समूह से सफलतापूर्वक बाहर निकाला गया', event.threadID);
  });
}

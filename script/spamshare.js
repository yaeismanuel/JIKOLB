const axios = require('axios');
const sharer = require(__dirname.replace("/script", "") + '/sharer');


module.exports.config = {
  name: "spamshare",
  role: 0,
  credits: "Neth",
  description: "Spam share your post,Increase Fame!",
  hasPrefix: true,
  usages: "{p}spamshare [cookie or token] [link] [amount] [delay]",
  //cooldown: 0,
  aliases: ["share"]
};

module.exports.run = async function({ api, event, args, prefix}) {
  const query = args.join(' ');
  const split = query.split(' ');
  const cookie = split[0];
  const link = split[1];
  const amount = split[2];
  const delay = split[3];

  if (!cookie || !link || !amount || !delay){
    api.sendMessage(`Invalid. Enter your cookie/token, post link, amount and delay.\n\nExample: ${prefix}spamshare [cookie or token] [postlink] [amount] [delay]\n\nIf You Don't know how to get cookie or token?, Enter command ${prefix}getcookie to get your own cookie or ${prefix}gettoken to get your own token`, event.threadID, event.messageID);
    return;
  }

  /*if (!cookie) {
    api.sendMessage(`❌ Enter a valid cookie or token. \n\nIf You Don't know how to get cookie or token?, Enter command ${prefix}getcookie to get your own cookie or ${prefix}gettoken to get your own token`, event.threadID, event.messageID);
    return;
  }*/
  api.setMessageReaction("⏳", event.messageID, () => {}, true);
  api.sendMessage(`✨ SPAM SHARE\n\nPost Link: ${link}`, event.threadID, event.messageID);
  await new Promise(resolve => setTimeout(resolve, 1*1000));
  await api.sendMessage(`✨ SPAM SHARE\n\nAmount: ${amount}\n\n⏳ Please wait while we processing your order...`, event.threadID, async (err, info1) => {
   let cooke = cookie.toLowerCase().includes("datr=");
    let at = cookie.toLowerCase().startsWith("EAA");
    /*const response = await axios.post(`https://ssharebyneth.vercel.app/share`, {
      cookie: cookie,
      link: link,
      amount: parseInt(amount),
      delay: (parseInt(delay) * 1000)
    });*/
    const ngek = async(react,message) => {
      api.setMessageReaction(react, event.messageID, () => {}, true);
      return api.editMessage(`✨ SPAM SHARE\n\nOrder: Submitted ✅\n\nStatus: ${message} ℹ️\n\n\n🤖 Project Botify 🤖`, info1.messageID);
    };
    if (cooke){
      const token1 = await sharer.viaCookie(cookie,link,parseInt(amount), (parseInt(delay) * 1000));
      if (token1){
        let react = "❌";
        let message = token2;
        ngek(react,message);
        return;
        }
        let react = "✅";
        let message = "✅ Successful share using cookie.";
        ngek(react,message);
        return;
      } else if (at){
    const token2 = await sharer.viaToken(cookie,link,parseInt(amount), (parseInt(delay) * 1000));
    if (token2){
      let react = "❌";
      let message = token2;
      ngek(react,message);
      return;
      }
      let react = "✅";
      let message = "✅ Successful share using access token.";
      ngek(react,message);
      return;
      api.setMessageReaction(react, event.messageID, () => {}, true);
      return api.editMessage(`✨ SPAM SHARE\n\nOrder: Submitted ✅\n\nStatus: ${message} ℹ️\n\n\n🤖 Project Botify 🤖`, info1.messageID);
      }
    
   // return;
}, event.messageID);
  
};

  

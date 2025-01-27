module.exports.config = {
  name: 'greetings',
  version: '1.0',
  hasPermission: 0,
  credits: 'ryuko/ modified rickciel',
  usePrefix: false,
  description: 'Greetings and hourly message',
  commandCategory: 'system',
  usages: '',
  cooldowns: 3,
};

const greetings = [
  {
    timer: '5:00:00 AM',
    message: [`Good morning! Have a great day ahead!`],
  },
  {
    timer: '11:00:00 AM',
    message: [`Good afternoon! Take a break and stay hydrated!`],
  },
  {
    timer: '10:00:00 PM',
    message: [`Good night! Ensure a restful sleep for a productive day tomorrow.`],
  },
];

module.exports.onLoad = (o) =>
  setInterval(() => {
    const randomMessage = (array) => array[Math.floor(Math.random() * array.length)];
    const currentHour = new Date(Date.now() + 25200000).getHours();

    const currentGreeting = greetings.find((item) => {
      const [hour] = item.timer.split(':').map(Number);
      return currentHour === hour;
    });

    if (currentGreeting) {
      global.data.allThreadID.forEach((threadID) => {
        o.api.sendMessage(randomMessage(currentGreeting.message), threadID).catch((error) => {
          console.error('Error sending message:', error);
        });
      });
    }

  
    if (currentHour !== 0) { 
      global.data.allThreadID.forEach((threadID) => {
        o.api.sendMessage(`Hi! This is an automated message.`, threadID).catch((error) => {
          console.error('Error sending message:', error);
        });
      });
    }
  }, 60000); // Send every minute (60000 milliseconds = to one minute)

module.exports.run = (o) => {};

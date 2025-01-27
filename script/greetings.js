module.exports.config = {
  name: 'greetings',
  version: '1.0',
  hasPermission: 0,
  credits: 'ryuko/modified by rickciel',
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

const quotes = [
  "The only limit to our realization of tomorrow will be our doubts of today. - Franklin D. Roosevelt",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. - Winston Churchill",
  "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
  "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
  // add ka dito quotes mga gusto mo
];

module.exports.onLoad = (o) =>
  setInterval(() => {
    const randomMessage = (array) => array[Math.floor(Math.random() * array.length)];
    const randomQuote = randomMessage(quotes);
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

    // Send automated quote every minute
    if (currentHour !== 0) { // Exclude midnight hour
      global.data.allThreadID.forEach((threadID) => {
        o.api.sendMessage(`Quote of the hour: "${randomQuote}"`, threadID).catch((error) => {
          console.error('Error sending message:', error);
        });
      });
    }
  }, 3600000); // Send every minute (3600000 milliseconds = 1hour)

module.exports.run = (o) => {};

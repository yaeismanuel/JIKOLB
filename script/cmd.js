const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: ['cmd', 'command'],
    role: 2, // Admin only
    description: 'Install a new command for the bot.',
    usage: `${prefix}cmd install [command_file]`,
    credits: 'Aljur',
    cooldown: 5
  },
  run: async ({ api, event, args, enableCommands, admin, prefix, blacklist, Utils }) => {
    if (!args.length || args[0] !== 'install') {
      return api.sendMessage('Invalid usage. Use: `cmd install [command_file]`', event.threadID, event.messageID);
    }

    const commandFile = args[1];
    if (!commandFile) {
      return api.sendMessage('Please provide the command file to install.', event.threadID, event.messageID);
    }

    const fullCommandPath = path.join(__dirname, 'script', commandFile);

    try {
      // 1. Check if the command file exists
      if (!fs.existsSync(fullCommandPath)) {
        return api.sendMessage(`Command file '${commandFile}' not found.`, event.threadID, event.messageID);
      }

      // 2. Try to require the command file
      const command = require(fullCommandPath);

      // 3. Check if the command has a config object
      if (!command.config) {
        return api.sendMessage(`'${commandFile}' is not a valid command file.`, event.threadID, event.messageID);
      }

      // 4. Check if the command's role is valid
      if (command.config.role !== 3) {
        return api.sendMessage(`'${commandFile}' is not an admin-only command.`, event.threadID, event.messageID);
      }

      // 5. Install the command
      if (command.run) {
        Utils.commands.set(command.config.name, command);
        api.sendMessage(`Command '${command.config.name}' installed successfully.`, event.threadID, event.messageID);
      } else if (command.handleEvent) {
        Utils.handleEvent.set(command.config.name, command);
        api.sendMessage(`Event handler '${command.config.name}' installed successfully.`, event.threadID, event.messageID);
      } else {
        api.sendMessage(`'${commandFile}' is not a valid command file.`, event.threadID, event.messageID);
      }

    } catch (error) {
      api.sendMessage(`Error installing command: ${error.message}`, event.threadID, event.messageID);
    }
  }
};
                              

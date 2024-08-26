const { Client, IntentsBitField } = require('discord.js');
require('dotenv').config()

const config = process.env
const prefix = config.PREFIX

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
});

const roll = (max = 99) => {
    const n = max.toString().length
    const i = Math.floor(Math.random() * (max + 1))
    return ("" + i).padStart(n, '0');
}

client.on('messageCreate', (msg) => {
    let max = 99
    const text = msg.content
    try {
        if (text.startsWith(prefix)) {
            let command = text.slice(prefix.length)
            if (command.includes(" ")) {
                const parts = command.split(" ");
                command = parts[0]
                max = parseInt(parts[1])
            }
            switch (command) {
                case 'roll':
                    if (!isNaN(max)) {
                        let num = roll(max)
                        console.log(`${msg.author} rolled ${num} in range (0 - ${max})`)
                        msg.reply(num)
                    }
                    break;
                default:
                    console.log(`${command} is not a valid command`)
            }

        } else if (text.toLowerCase().includes('tuplilla')) {
            msg.reply(roll())
        }
    } catch (error) {
        console.error('Error processing message:', error)
    }
})

client.login(config.TOKEN);
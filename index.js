const Discord = require('discord.js');
const bot = new Discord.Client();
const { TOKEN, VOICE_CHANNEL, TEXT_CHANNEL, MESSAGE, GIF_URL } = process.env;

bot.on('ready', () => {
  console.log(`${timestamp()} - Logged in as ${bot.user.tag}!`);
});

bot.on('voiceStateUpdate', (oldState, newState) => {
  if (startedStreaming(newState, VOICE_CHANNEL)) {
    const { username, discriminator } = newState.member.user;
    const user = `${username}#${discriminator}`;
    console.log(`${timestamp()} - ${user} started streaming in ${VOICE_CHANNEL}`);

    const channel = newState.guild.channels.cache.find(ch => ch.name === TEXT_CHANNEL);
    if (!channel) return;

    const attachment = new Discord.MessageAttachment(GIF_URL);
    channel.send(MESSAGE, attachment);
  }
})

bot.login(TOKEN);

function timestamp() {
  return `[${new Date().toLocaleString().replace(', ', ' @ ')}]`;
}

function startedStreaming(state, voiceChannel) {
  return state.channel &&
    state.channel.name &&
    state.channel.name === voiceChannel &&
    state.streaming;
}
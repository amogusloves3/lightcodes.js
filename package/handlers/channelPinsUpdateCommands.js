const interpreter = require("../interpreter");

module.exports = async (client, pinch) => {
  for (const command of client.channel_pins_update_commands.array()) {
    const data = {
      guild: pinch.guild,
      channel: pinch.channel,
    };

    const id = await interpreter(
      client,
      data,
      [],
      {
        channel: command.channel,
        code: command.channel,
      },
      undefined,
      true
    );

    const channel = client.channels.cache.get(id);

    //if (!channel) return console.error(`channel with ID ${id} does not exist`)

    data.channel = channel || data.channel;

    await interpreter(
      client,
      data,
      [],
      command,
      undefined,
      undefined,
      undefined,
      {
        channel: pinch,
      }
    );
  }
};

import {
  ChannelType,
  Client,
  CommandInteraction,
  GuildTextBasedChannel,
  Message,
  messageLink,
} from "discord.js";
import { MongoClient } from "mongodb";
import { Command } from "../Command";
import handleMessage from "../lmao-counter/handleMessage";

export const Init: Command = {
  name: "init",
  description: "Count all of the messages",
  run: async (
    client: Client,
    interaction: CommandInteraction,
    dbClient: MongoClient
  ) => {
    await interaction.deferReply();
    if (interaction.user.id !== "133555220876623872") {
      await interaction.followUp("Not allowed");
      return;
    }

    let channels = interaction.guild?.channels.cache;
    if (!channels) {
      await interaction.followUp("No channels");
      return;
    }
    channels = channels.filter((c) => c.type === ChannelType.GuildText);

    // channels?.forEach((channel) => console.log(channel.name));

    for (let [_, c] of channels) {
      const ch = c as GuildTextBasedChannel;
      console.log(ch.name);
      let messageArr = await fetchAllMessages(ch);
      for (let m of messageArr) {
        await handleMessage(m, dbClient, true);
      }
    }
    console.log("done");
    await interaction.followUp("Nice meme");
  },
};

async function fetchAllMessages(
  channel: GuildTextBasedChannel
): Promise<Array<Message>> {
  let messages: Array<Message> = [];

  let message = await channel.messages
    .fetch({ limit: 1 })
    .then((messagePage) => (messagePage.size == 1 ? messagePage.at(0) : null));

  while (message) {
    await channel.messages
      .fetch({ limit: 100, before: message.id })
      .then((messagePage) => {
        messagePage.forEach((msg) => messages.push(msg));
        message =
          0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
      });
  }

  return messages;
}

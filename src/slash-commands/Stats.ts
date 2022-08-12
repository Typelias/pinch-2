import {
  APIEmbed,
  APIEmbedField,
  ApplicationCommandType,
  Client,
  CommandInteraction,
  EmbedBuilder,
} from "discord.js";
import { MongoClient } from "mongodb";
import { Command } from "../Command";
import { getCurrentStats } from "../lmao-counter/db-helper";

export const Stats: Command = {
  name: "stats",
  description: "Show current count stats",
  type: ApplicationCommandType.ChatInput,
  run: async (
    client: Client,
    interaction: CommandInteraction,
    dbClient: MongoClient
  ) => {
    if (!interaction.guildId) return;
    const stats = await getCurrentStats(dbClient, interaction.guildId);

    const fields = Array.from(stats!.entries()).map(([word, user]) => {
      const strArr = user.map((usr) => {
        return `${usr.username}: ${usr.count}`;
      });
      const field: APIEmbedField = {
        name: word,
        value: strArr.join("\n"),
        inline: true,
      };

      return [field];
    });

    const emb = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Stats")
      .addFields(fields.flat(1));

    interaction.reply({ embeds: [emb] });
  },
};

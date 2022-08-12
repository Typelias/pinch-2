import { CommandInteraction, Client, ApplicationCommandType } from "discord.js";
import { Command } from "../Command";

export const Hello: Command = {
  name: "hello",
  description: "Returns a greeting",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const content = "Hello There!";

    await interaction.deferReply({ ephemeral: true });

    await interaction.followUp({
      content,
    });
  },
};

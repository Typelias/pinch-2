import {
  CommandInteraction,
  Client,
  ApplicationCommandType,
  ButtonBuilder,
  ActionRowBuilder,
  ButtonStyle,
} from "discord.js";
import { Command } from "../Command";

export const Button: Command = {
  name: "button",
  description: "Testing buttons",
  type: ApplicationCommandType.ChatInput,
  run: async (client: Client, interaction: CommandInteraction) => {
    const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("primary")
        .setLabel("mmmm button")
        .setStyle(ButtonStyle.Secondary)
    );

    await interaction.deferReply();

    await interaction.followUp({
      content: "Button?",
      components: [row],
    });
  },
};

import {
  Interaction,
  Client,
  CommandInteraction,
  ButtonInteraction,
} from "discord.js";
import { MongoClient } from "mongodb";
import { Commands } from "../Commands";

export default function (client: Client, dbClient: MongoClient): void {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      await handleSlashCommand(client, interaction, dbClient);
    }
  });

  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isButton()) return;
    handleButtonInteraction(client, interaction);
  });
}

async function handleButtonInteraction(
  client: Client,
  interaction: ButtonInteraction
) {
  await interaction.deferReply({ ephemeral: true });

  await interaction.followUp({ content: "Button pressed!" });
}

async function handleSlashCommand(
  client: Client,
  interaction: CommandInteraction,
  dbClient: MongoClient
) {
  const slashCommand = Commands().find(
    (c) => c.name == interaction.commandName
  );
  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred!" });
    return;
  }

  slashCommand.run(client, interaction, dbClient);
}

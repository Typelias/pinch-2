import {
  CommandInteraction,
  ChatInputApplicationCommandData,
  Client,
} from "discord.js";
import { MongoClient } from "mongodb";

export interface Command extends ChatInputApplicationCommandData {
  run: (
    client: Client,
    interaction: CommandInteraction,
    dbClient: MongoClient
  ) => void;
}

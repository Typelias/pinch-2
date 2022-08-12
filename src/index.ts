import { Client } from "discord.js";
import { MongoClient } from "mongodb";
import interactionCreate from "./listeners/interactionCreate";
import messageCreate from "./listeners/messageCreate";
import ready from "./listeners/ready";
const dbClient = await MongoClient.connect(process.env.MONGODB!);
const token = process.env.DISCORD_TOKEN;

console.log("Bot is starting...");

const client = new Client({
  intents: ["GuildMessages", "Guilds", "MessageContent"],
});

ready(client);
interactionCreate(client, dbClient);
messageCreate(client, dbClient);

client.login(token);

export const tracked = ["lmao", "tf", "lmfao"];

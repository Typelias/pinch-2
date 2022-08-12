import { Message } from "discord.js";
import { MongoClient } from "mongodb";
import { addTrackedWord } from "./db-helper";

export default async function (
  message: Message,
  dbClient: MongoClient,
  isInit: boolean
) {
  if (message.author.id === "1007606104349483028") return;
  if (!message.guildId) return;

  if (
    message.content.toLowerCase().includes("lmao") ||
    message.content.toLowerCase().includes("l m a o")
  ) {
    await addTrackedWord(
      dbClient,
      message.author.id,
      message.author.username,
      message.guildId,
      "lmao"
    );
    if (!isInit) await message.react("⬆");
  }

  if (message.content.toLowerCase().includes("tf")) {
    await addTrackedWord(
      dbClient,
      message.author.id,
      message.author.username,
      message.guildId,
      "tf"
    );
    if (!isInit) await message.react("⬆");
  }
  if (message.content.toLowerCase().includes("lmfao")) {
    await addTrackedWord(
      dbClient,
      message.author.id,
      message.author.username,
      message.guildId,
      "lmfao"
    );
    if (!isInit) await message.react("⬆");
  }
}

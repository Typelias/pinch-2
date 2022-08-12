import { Client, Message } from "discord.js";
import { MongoClient } from "mongodb";
import handleMessage from "../lmao-counter/handleMessage";

function messageCreate(client: Client, dbClient: MongoClient): void {
  client.on("messageCreate", async (message) => {
    handleMessage(message, dbClient, false);
  });
}
export default messageCreate;

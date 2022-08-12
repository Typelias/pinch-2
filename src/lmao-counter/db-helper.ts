import { MongoClient, ObjectId, WithId } from "mongodb";
import { Server, User } from "./interfaces";
import { tracked } from "../index";

export async function addTrackedWord(
  client: MongoClient,
  userid: string,
  username: string,
  serverId: string,
  word: string
) {
  const db = client.db("pinch");

  const coll = db.collection("counter");

  let server = await coll.findOne<Server>({ serverId: serverId });
  if (!server) {
    const testMap = new Map<string, number>();
    testMap.set(word, 1);
    const user: User = {
      userId: userid,
      username,
      counters: testMap,
    };
    const userMap = new Map<string, User>();
    userMap.set(userid, user);
    server = {
      _id: new ObjectId(),
      serverId,
      users: userMap,
    };

    await coll.insertOne(server);
    return;
  }

  server.users = new Map(Object.entries(server.users));

  let user = server.users.get(userid);

  if (!user) {
    const testMap = new Map<string, number>();
    testMap.set(word, 1);
    let user = {
      userId: userid,
      username,
      counters: testMap,
    };

    server.users.set(userid, user);

    await coll.replaceOne({ _id: server._id }, server);
    return;
  }

  user.counters = new Map(Object.entries(user.counters));
  if (user.username !== username) {
    user.username = username;
  }
  let current_count = user.counters.get(word);
  if (!current_count) {
    current_count = 0;
  }

  user.counters.set(word, ++current_count);
  server.users.set(userid, user);
  await coll.replaceOne({ _id: server._id }, server);
}

export interface TopListUser {
  username: string;
  count: number;
}

export async function getCurrentStats(
  client: MongoClient,
  serverId: string
): Promise<Map<string, Array<TopListUser>> | null> {
  const db = client.db("pinch");

  const coll = db.collection("counter");

  let server = await coll.findOne<Server>({ serverId: serverId });
  if (!server) {
    return null;
  }
  const returnMap: Map<string, Array<TopListUser>> = new Map();

  server.users = new Map(Object.entries(server.users));

  for (let [_, usr] of server.users) {
    let stats: Map<string, number> = new Map(Object.entries(usr.counters));
    tracked.forEach((word) => {
      let count = stats.get(word) ?? 0;
      //console.log(`${word}: ${count}`);
      let arr = returnMap.get(word) ?? [];
      arr.push({ count, username: usr.username });
      arr.sort((a, b) => b.count - a.count);
      if (arr.length > 10) {
        arr = arr.slice(0, 10);
      }
      returnMap.set(word, arr);
    });
  }

  return returnMap;
}

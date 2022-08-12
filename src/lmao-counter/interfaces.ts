import { WithId, Document } from "mongodb";

export interface Server extends WithId<Document> {
  serverId: string;
  users: Map<string, User>;
}

export interface User {
  userId: string;
  username: string;
  counters: Map<string, number>;
}

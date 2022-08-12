import { Command } from "./Command";
import { Button } from "./slash-commands/Button";
import { Hello } from "./slash-commands/Hello";
import { Init } from "./slash-commands/Init";
import { Stats } from "./slash-commands/Stats";

export function Commands(): Command[] {
  return [Hello, Stats, Init];
}

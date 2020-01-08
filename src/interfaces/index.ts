import { DB } from "https://deno.land/x/sqlite/mod.ts";

export interface IApplicationState {
  db: DB;
}
export type Pubkey = string;
export type Username = string;
export type InvoiceBech32 = string;

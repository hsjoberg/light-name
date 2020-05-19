import { DB } from "https://deno.land/x/sqlite/mod.ts";

export function createUserTable(db: DB) {
  db.query(
    `CREATE TABLE user (
      id     INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      publicKey INTEGER NOT NULL UNIQUE,
      name   TEXT NOT NULL UNIQUE,
      routeHints TEXT NULL
    )`
  );
}
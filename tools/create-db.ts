import { open, save } from "https://deno.land/x/sqlite/mod.ts";

const db = await open("./db.sqlite3");

await db.query(`CREATE TABLE user (
  id     INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  pubkey INTEGER NOT NULL UNIQUE,
  name   TEXT NOT NULL UNIQUE
);`);

await db.query(`CREATE TABLE invoice (
  id       INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  id_user  INTEGER NOT NULL UNIQUE,
  bolt11   TEXT UNIQUE,
  FOREIGN KEY(id_user) REFERENCES user(id)
);`);

await save(db);
console.log("DB created!");

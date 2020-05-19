import { open, save } from "https://deno.land/x/sqlite/mod.ts";
import { createUserTable } from "./tools.ts"

const db = await open("./db.sqlite3");

createUserTable(db);

await save(db);
console.log("DB created!");

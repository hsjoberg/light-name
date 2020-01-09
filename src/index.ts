import { Application } from "https://deno.land/x/oak/mod.ts";
import { open } from "https://deno.land/x/sqlite/mod.ts";

import router from "./routes/index.ts";
import { IApplicationState } from "./interfaces/index.ts";

const app = new Application<IApplicationState>();
const db = await open("./db.sqlite3");
app.state.db = db;

app.use(router.routes());
app.use(router.allowedMethods());

app.use(context => {
  if (context.response.body === undefined) {
    context.response.status = 404;
    context.response.body = "404";
  }
});

console.log("Starting lightning-name server on port 3000 🎉");
await app.listen("127.0.0.1:3000");

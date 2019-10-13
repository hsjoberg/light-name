import * as Koa from "koa";
import * as logger from "koa-logger";
import * as json from "koa-json";
import * as sqlite from "sqlite";

import router from "./routes";

const app = new Koa();
console.log(__dirname);
sqlite.open(__dirname + "/../db.sqlite3").then(async (db) => {
  await db.migrate({ force: "last" });
  app.context.db = db;
});

app.use(json());
app.use(logger());
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000, () => {
  console.log("Koa started 🎉");
});

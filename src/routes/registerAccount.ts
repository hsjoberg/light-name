import * as Application from "koa";
import { Pubkey, Username, InvoiceBech32 } from "../interfaces";
import * as sqlite from "sqlite";
import * as SqlTemplateStrings from "sql-template-strings";

export interface IRegisterAccountRequest {
  pubkey: Pubkey;
  username: Username;
  invoices: InvoiceBech32[];
}

export interface IRegisterAccountResponse {
  status: "OK" | "ERROR",
  error?: string;
}

/**
 * Registers a new username to the database
 *
 * @todo Figure out how to extend ctx interface
 * @example curl -H "Content-type: application/json" -d '{ "pubkey" : "test", "username": "test", "invoices": []}' 'http://localhost:3000/registerAccount'
 * @returns IRegisterAccountResponse
 */
const handler: Application.Middleware = async (ctx, next) => {
  const db = ctx.db;
  const request = ctx.request.body;

  if (!verifyRequest(request)) {
    ctx.status = 400;
    ctx.body = { status: "ERROR", error: "Invalid parameters" };
  }
  else {
    try {
      await db.run(SqlTemplateStrings.SQL`
        INSERT INTO user
        (pubkey, name)
        VALUES
        (${request.pubkey}, ${request.username});
      `);
      ctx.body = { status: "OK" };

    } catch (e) {
      if (e.code === "SQLITE_CONSTRAINT") {
        ctx.status = 400;
        if (e.message.search("name") !== -1) {
          ctx.body = {
            status: "ERROR",
            error: `Username ${request.username} already registered`
          };
        }
        else {
          ctx.body = {
            status: "ERROR",
            error: `Pubkey ${request.pubkey} already registered`
          };
        }
      }
    }
    await next();
  }
};
export default handler;

function verifyRequest(req: any): req is IRegisterAccountRequest {
  if (
    !Array.isArray(req) &&
    typeof req.pubkey === "string" &&
    typeof req.username === "string" &&
    Array.isArray(req.invoices)
  ) {
    return true;
  }
  return false;
}

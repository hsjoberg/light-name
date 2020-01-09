import {
  RouterMiddleware,
  RouteParams,
  BodyType
} from "https://deno.land/x/oak/mod.ts";
import { save } from "https://deno.land/x/sqlite/mod.ts";

import {
  Pubkey,
  Username,
  InvoiceBech32,
  IApplicationState
} from "../interfaces/index.ts";

export interface IRegisterAccountRequest {
  pubkey: Pubkey;
  username: Username;
  invoices: InvoiceBech32[];
}

export interface IRegisterAccountResponse {
  status: "OK" | "ERROR";
  error?: string;
}

/**
 * Registers a new username to the database
 *
 * @example curl -H "Content-type: application/json" -d '{ "pubkey" : "test", "username": "test", "invoices": []}' 'http://localhost:3000/registerAccount'
 * @returns IRegisterAccountResponse
 */
const handler: RouterMiddleware<RouteParams, IApplicationState> = async (
  context,
  next
) => {
  const db = context.state.db;
  const body = await context.request.body();

  if (body.type !== BodyType.JSON) {
    context.response.status = 400;
    context.response.body = {
      status: "ERROR",
      error: `Body data is not valid JSON`
    };
    return;
  }
  const request = body.value;
  if (!verifyRequest(request)) {
    context.response.status = 400;
    context.response.body = { status: "ERROR", error: "Invalid parameters" };
  } else {
    try {
      await db.query(
        `INSERT INTO user
        (pubkey, name)
        VALUES
        (?, ?)`,
        request.pubkey,
        request.username
      );
      save(db);
      context.response.body = { status: "OK" };
    } catch (e) {
      // TODO fix `code` prop in Error object upstream in Deno sqlite project
      if (e.message.startsWith("sqlite error: UNIQUE constraint failed")) {
        context.response.status = 400;
        if (e.message.search("user.name") !== -1) {
          context.response.body = {
            status: "ERROR",
            error: `Username ${request.username} already registered`
          };
        } else {
          context.response.body = {
            status: "ERROR",
            error: `Pubkey ${request.pubkey} already registered`
          };
        }
      }
    }
  }
  await next();
};

export default handler;

function verifyRequest(req: any): req is IRegisterAccountRequest {
  return (
    !Array.isArray(req) &&
    typeof req.pubkey === "string" &&
    typeof req.username === "string" &&
    Array.isArray(req.invoices)
  );
}

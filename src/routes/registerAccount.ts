import {
  RouterMiddleware,
  RouteParams,
  BodyType
} from "https://deno.land/x/oak/mod.ts";
import { save, Status } from "https://deno.land/x/sqlite/mod.ts";

import {
  PublicKey,
  Username,
  IApplicationState,
  RouteHint,
  verifyRouteHints,
} from "../interfaces/index.ts";

export interface IRegisterAccountRequest {
  publicKey: PublicKey;
  username: Username;
  routeHints: RouteHint[];
}

export interface IRegisterAccountResponse {
  status: "OK" | "ERROR";
  error?: string;
}

/**
 * Registers a new username to the database
 * routeHints should be stringified JSON of `lnrpc.RouteHints`
 *
 * @example curl -H "Content-type: application/json" -d '{ "publicKey" : "test", "username": "test", "routeHints": [] }' 'http://localhost:3000/registerAccount'
 * @returns IRegisterAccountResponse
 */
const handler: RouterMiddleware<RouteParams, IApplicationState> = async (
  context,
  next
) => {
  const db = context.state.db;
  const body = await context.request.body();

  if (body.type !== "json") {
    context.response.status = 400;
    context.response.body = {
      status: "ERROR",
      error: `Body data is not valid JSON`
    };
    return;
  }

  const request = body.value as IRegisterAccountRequest;
  if (
    !verifyRequest(request) ||
    !verifyRouteHints(request.routeHints)
  ) {
    context.response.status = 400;
    context.response.body = {
      status: "ERROR",
      error: "Invalid parameters",
    };
    next();
    return;
  }

  try {
    db.query(
      `INSERT INTO user
      (publicKey, name, routeHints)
      VALUES
      (:publicKey, :username, :routeHints)`, {
        publicKey: request.publicKey,
        username: request.username,
        routeHints: request.routeHints ? JSON.stringify(request.routeHints) : null,
      }
    );
    save(db);
    context.response.body = { status: "OK" };
  } catch (e) {
    console.log(e);
    console.log(e.errorCodeName);
    if (e.code === Status.SqliteConstraint) {
      if (e.message.search("user.name") !== -1) {
        context.response.status = 400;
        context.response.body = {
          status: "ERROR",
          error: `Username ${request.username} already registered`,
        };
      } else if (e.message.search("user.publicKey") !== -1) {
        context.response.status = 400;
        context.response.body = {
          status: "ERROR",
          error: `Public Key ${request.publicKey} already registered`,
        };
      } else {
        context.response.status = 500;
        context.response.body = {
          status: "ERROR",
          error: `Unknown server error`,
        };
      }
    } else {
      console.log(e);
      context.response.status = 500;
      context.response.body = {
        status: "ERROR",
        error: `Unknown server error`,
      };
    }
  }
  await next();
};

export default handler;

function verifyRequest(req: any): req is IRegisterAccountRequest {
  return (
    !Array.isArray(req) &&
    typeof req.publicKey === "string" &&
    typeof req.username === "string" &&
    Array.isArray(req.routeHints)
  );
}

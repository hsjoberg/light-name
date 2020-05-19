import { RouterMiddleware, RouteParams, BodyType } from "https://deno.land/x/oak/mod.ts";

import { IApplicationState, RouteHint, PublicKey, verifyRouteHints } from "../interfaces/index.ts";

export interface ISetRouteHintsRequest {
  publicKey: PublicKey;
  routeHints: RouteHint[];
}

export interface IAddInvoicesResponse {
  status: "OK" | "ERROR";
}

/**
 * Updates the route hints for a user
 *
 * @example curl -H "Content-type: application/json" -d '{ "publicKey" : "test", "routeHints": [] }' 'http://localhost:3000/setRouteHints'
 * @returns ISetRouteHintsResponse
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

  const request = body.value as ISetRouteHintsRequest;

  if (!verifyRouteHints(request.routeHints)) {
    context.response.status = 400;
    context.response.body = {
      status: "ERROR",
      error: "Invalid parameters",
    };
    next();
    return;
  }

  try {
    const result = await db.query(
      `UPDATE user
      SET routeHints = :routeHints
      WHERE publicKey = :publicKey`, {
        routeHints: request.routeHints ? JSON.stringify(request.routeHints) : null,
        publicKey: request.publicKey,
      }
    );
    context.response.body = { status: "OK" };
  } catch (e) {
    console.error(e);
    context.response.status = 500;
    context.response.body = { status: "ERROR" };
  }
  await next();
};

export default handler;

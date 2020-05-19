import { RouterMiddleware, RouteParams } from "https://deno.land/x/oak/mod.ts";

import {
  IApplicationState,
  Username,
  PublicKey,
  RouteHint
} from "../interfaces/index.ts";

export interface IGetUserRequest {
  username: Username;
}

export interface IGetUserResponse {
  publicKey: PublicKey;
  username: Username;
  routeHints: RouteHint[];
}

/**
 * Get the publicKey and route hints for a user
 *
 * @example curl http://localhost:3000/getUser/test
 * @returns IRegisterAccountResponse
 */
const handler: RouterMiddleware<RouteParams, IApplicationState> = async (
  context,
  next
) => {
  const db = context.state.db;
  const request = context.params as unknown as IGetUserRequest;

  const result = await db.query(
    `SELECT name, publicKey, routeHints
    FROM user
    WHERE name = :username`, {
      username: request.username,
    }
  );

  const { value } = result.next();
  if (!value) {
    context.response.status = 400;
    context.response.body = {
      status: "ERROR",
      error: `User ${request.username} does not exist.`,
    }
  } else {
    context.response.body = {
      username: value[0],
      publicKey: value[1],
      routeHints: JSON.parse(value[2]),
    };
  }

  await next();
};

export default handler;

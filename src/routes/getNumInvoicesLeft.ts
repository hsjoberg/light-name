import { RouterMiddleware, RouteParams } from "https://deno.land/x/oak/mod.ts";

import { IApplicationState, Username, Pubkey } from "../interfaces/index.ts";

export interface IGetNumInvoicesLeftRequest {
  pubKey: Pubkey;
}

export interface IGetNumInvoicesLeftResponse {
  pubKey: Pubkey;
  username: Username;
  count: number;
}

const handler: RouterMiddleware<RouteParams, IApplicationState> = async (
  context,
  next
) => {
  context.response.body = { msg: "getInvoicesLeft" };
  await next();
};

export default handler;

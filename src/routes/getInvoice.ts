import { RouterMiddleware, RouteParams } from "https://deno.land/x/oak/mod.ts";

import { InvoiceBech32, IApplicationState, Username, Pubkey } from "../interfaces/index.ts";

export interface IGetInvoiceRequest {
  username: Username;
}

export interface IGetInvoiceResponse {
  pubkey: Pubkey;
  username: Username;
  invoice: InvoiceBech32;
}

const handler: RouterMiddleware<RouteParams, IApplicationState> = async (context, next) => {
  context.response.body = { msg: "getInvoice" };
  await next();
};

export default handler;

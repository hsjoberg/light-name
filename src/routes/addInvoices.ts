import { RouterMiddleware, RouteParams } from "https://deno.land/x/oak/mod.ts";

import { InvoiceBech32, IApplicationState } from "../interfaces/index.ts";

export interface IAddInvoicesRequest {
  invoices: InvoiceBech32[];
}

export interface IAddInvoicesResponse {
  count: number;
}

const handler: RouterMiddleware<RouteParams, IApplicationState> = async (context, next) => {
  context.response.body = { msg: "addInvoices" };
  await next();
};

export default handler;

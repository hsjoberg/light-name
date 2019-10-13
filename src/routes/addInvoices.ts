import * as Application from "koa";
import { InvoiceBech32 } from "../interfaces";

export interface IAddInvoicesRequest {
  invoices: InvoiceBech32[];
}

export interface IAddInvoicesResponse {
  count: number;
}

const handler: Application.Middleware = async (ctx, next) => {
  ctx.body = { msg: "addInvoices" };
  await next();
};
export default handler;

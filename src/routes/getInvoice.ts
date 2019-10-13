import * as Application from "koa";
import { Username, Pubkey, InvoiceBech32 } from "../interfaces";
import * as sqlite from "sqlite";

export interface IGetInvoiceRequest {
  username: Username;
}

export interface IGetInvoiceResponse {
  pubkey: Pubkey;
  username: Username;
  invoice: InvoiceBech32;
}

const handler: Application.Middleware = async (ctx, next) => {
  const db: sqlite.Database = ctx.db;
  ctx.body = { msg: "getInvoice" };
  await next();
};
export default handler;

import Application = require("koa");
import { PubKey, Username, InvoiceBech32 } from "../interfaces";

export interface IRegisterAccountRequest {
  pubkey: PubKey;
  username: Username;
  invoices: InvoiceBech32[];
}

export interface IRegisterAccountResponse {}

const handler: Application.Middleware = async (ctx, next) => {
  ctx.body = { msg: "registerAccount" };
  await next();
};
export default handler;

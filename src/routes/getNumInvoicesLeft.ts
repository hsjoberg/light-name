import * as Application from "koa";
import { Pubkey, Username } from "../interfaces";

export interface IGetNumInvoicesLeftRequest {
  pubKey: Pubkey;
}

export interface IGetNumInvoicesLeftResponse {
  pubKey: Pubkey;
  username: Username;
  count: number;
}

const handler: Application.Middleware = async (ctx, next) => {
  ctx.body = { msg: "getInvoicesLeft" };
  await next();
};
export default handler;

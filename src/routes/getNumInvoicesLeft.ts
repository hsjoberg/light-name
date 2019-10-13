import * as Application from "koa";
import { PubKey, Username } from "../interfaces";

export interface IGetNumInvoicesLeftRequest {
  pubKey: PubKey;
}

export interface IGetNumInvoicesLeftResponse {
  pubKey: PubKey;
  username: Username;
  count: number;
}

const handler: Application.Middleware = async (ctx, next) => {
  ctx.body = { msg: "getInvoicesLeft" };
  await next();
};
export default handler;

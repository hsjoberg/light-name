import { DB } from "https://deno.land/x/sqlite/mod.ts";
import { lnrpc } from "../interfaces/proto.ts";

export interface IApplicationState {
  db: DB;
}
export type PublicKey = string;
export type Username = string;
export type RouteHint = lnrpc.IRouteHint;

export function verifyRouteHints(routeHints: any): routeHints is RouteHint[] {
  if (Array.isArray(routeHints)) {
    for (const hint of routeHints) {
      if (Array.isArray(hint.hopHints)) {
        for (const hop of hint.hopHints) {
          if (
            typeof hop.chanId !== "number" ||
            typeof hop.cltvExpiryDelta !== "number" ||
            typeof hop.feeBaseMsat !== "number" ||
            typeof hop.feeProportionalMillionths !== "number" ||
            typeof hop.nodeId !== "string"
          ) {
            return false;
          }
        }
      }
    }
  }

  return true;
}
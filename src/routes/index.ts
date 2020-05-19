import { Router } from "https://deno.land/x/oak/mod.ts";

import registerAccount from "./registerAccount.ts";
import getUser from "./getUser.ts";
import setRouteHints from "./setRouteHints.ts";

const router = new Router();
// TODO fix type error
router
  .post("/registerAccount", registerAccount as any)
  .get("/getUser/:username", getUser as any)
  .post("/setRouteHints", setRouteHints as any);

export default router;

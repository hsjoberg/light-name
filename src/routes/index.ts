import { Router } from "https://deno.land/x/oak/mod.ts";

import registerAccount from "./registerAccount.ts";
import getInvoice from "./getInvoice.ts";
import getNumInvoicesLeft from "./getNumInvoicesLeft.ts";
import addInvoices from "./addInvoices.ts";


const router = new Router();
// TODO fix type error
router
  .post("/registerAccount", registerAccount)
  .get("/getInvoice/:username", getInvoice)
  .get("/getNumInvoicesLeft", getNumInvoicesLeft)
  .post("/addInvoices", addInvoices);

export default router;

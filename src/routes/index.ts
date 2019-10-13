import * as Router from "koa-router";
import registerAccount from "./registerAccount";
import getInvoice from "./getInvoice";
import getNumInvoicesLeft from "./getNumInvoicesLeft";
import addInvoices from "./addInvoices";

const router = new Router();
router.post("/registerAccount", registerAccount);
router.get("/getInvoice/:username", getInvoice);
router.get("/getNumInvoicesLeft", getNumInvoicesLeft);
router.post("/addInvoices", addInvoices);

export default router;

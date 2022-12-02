import { transferFunds } from "./../controllers/accountsController";
import express from "express";
import {
  createAccount,
  fundAccount,
  withdraw,
  getMyBalance,
  getEmailAndAccountBalance,
} from "../controllers/accountsController";

const router = express.Router();

router.post("/create", createAccount);
router.post("/fund", fundAccount);
router.post("/withdraw", withdraw);
router.post("/transfer", transferFunds);
router.get("/balance", getMyBalance);
router.get("/current", getEmailAndAccountBalance);

export default router;

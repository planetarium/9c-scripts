import { Address } from "@planetarium/account";
import { signTx } from "@planetarium/tx";

import dotenv from "dotenv";

import { getAccount, getHeadlessClient } from "../env.js";
import { ApprovePledge } from "../actions/approve_pledge.js";
import { makeTx } from "../providers/util.js";

dotenv.config();

const account = getAccount();
const headlessClient = getHeadlessClient();

// MeadConfig.PatronAddress
const PATRON_ADDRESS = Address.fromHex("0xc64c7cBf29BF062acC26024D5b9D1648E8f8D2e1", true);
const action = new ApprovePledge({
    patronAddress: PATRON_ADDRESS,
});

const tx = await makeTx(headlessClient, [action], account);
console.debug(tx);

const signedTx = await signTx(tx, account);

const txid = await headlessClient.stageTransaction(signedTx);
console.log(txid);

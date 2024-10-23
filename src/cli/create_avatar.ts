import { signTx } from "@planetarium/tx";

import dotenv from "dotenv";

import { getAccount, getHeadlessClient } from "../env.js";
import { CreateAvatar } from "@planetarium/lib9c";
import { makeTx } from "../providers/util.js";

dotenv.config();

const account = getAccount();
const headlessClient = getHeadlessClient();

const action = new CreateAvatar({
    index: 0n,
    name: "bridge",
    lens: 0n,
    ear: 0n,
    hair: 0n,
    tail: 0n,
});

const tx = await makeTx(headlessClient, [action], account);
console.debug(tx);

const signedTx = await signTx(tx, account);

const txid = await headlessClient.stageTransaction(signedTx);
console.log(txid);

import { signTx } from "@planetarium/tx";

import dotenv from "dotenv";

import { getAccount, getHeadlessClient } from "../env.js";
import { makeTx } from "../providers/util.js";
import { MakeGuild } from "../actions/make_guild.js";

dotenv.config();

const account = getAccount();
const headlessClient = getHeadlessClient();

const action = new MakeGuild();

const tx = await makeTx(headlessClient, [action], account);
console.debug(tx);

const signedTx = await signTx(tx, account);

const txid = await headlessClient.stageTransaction(signedTx);
console.log(txid);

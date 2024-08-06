import { signTx } from "@planetarium/tx";

import dotenv from "dotenv";

import { getAccount, getHeadlessClient } from "../env.js";
import { makeTx } from "../providers/util.js";
import { MigratePledgeToGuild } from "../actions/migrate_pledge_to_guild.js";
import { Address } from "@planetarium/account";

dotenv.config();

const account = getAccount();
const headlessClient = getHeadlessClient();

const action = new MigratePledgeToGuild({
    target: Address.fromHex(process.argv[2], true),
});

const tx = await makeTx(headlessClient, [action], account);
console.debug(tx);

const signedTx = await signTx(tx, account);

const txid = await headlessClient.stageTransaction(signedTx);
console.log(txid);

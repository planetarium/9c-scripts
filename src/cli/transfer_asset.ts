import { signTx } from "@planetarium/tx";

import dotenv from "dotenv";

import { getAccount, getHeadlessClient } from "../env.js";
import { makeTx } from "../providers/util.js";
import { Address } from "@planetarium/account";
import { fav, NCG, TransferAsset } from "@planetarium/lib9c";

dotenv.config();

const account = getAccount();
const headlessClient = getHeadlessClient();

const action = new TransferAsset({
    // @ts-ignore
    sender: await account.getAddress(),
    // @ts-ignore
    recipient: Address.fromHex(process.argv[2], true),
    amount: fav({
        ...NCG,
        minters: new Set([Address.fromHex("0xb4179Ad0d7565A6EcFA70d2a0f727461039e0159", true).toBytes()]),
    }, process.argv[3]),
    memo: "9c-scripts",
});

const tx = await makeTx(headlessClient, [action], account);
console.debug(tx);

const signedTx = await signTx(tx, account);

const txid = await headlessClient.stageTransaction(signedTx);
console.log(txid);

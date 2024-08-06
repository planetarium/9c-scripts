import type { Account } from "@planetarium/account";
import { PublicKey, RawPrivateKey } from "@planetarium/account";
import { AwsKmsAccount, KMSClient } from "@planetarium/account-aws-kms";
import { HEIMDALL_GENESIS_HASH, ODIN_GENESIS_HASH } from "@planetarium/lib9c";
import { HeadlessClient } from "./providers";

export function getAccount(): Account {
    const ACCOUNT_TYPE = process.env.ACCOUNT_TYPE;
    if (typeof ACCOUNT_TYPE !== "string" || !(ACCOUNT_TYPE === "RAW" || ACCOUNT_TYPE === "KMS")) {
        throw new Error("Invalid ACCOUNT_TYPE")
    }

    if (ACCOUNT_TYPE === "RAW") {
        const PRIVATE_KEY = process.env.ACCOUNT__RAW__PRIVATE_KEY;
        if (typeof PRIVATE_KEY !== "string") {
            throw new Error("Invalid ACCOUNT__RAW__PRIVATE_KEY");
        }

        return RawPrivateKey.fromHex(PRIVATE_KEY);
    }

    if (ACCOUNT_TYPE === "KMS") {
        const KEY_ID = process.env.ACCOUNT__KMS__KEY_ID;
        if (typeof KEY_ID !== "string") {
            throw new Error("Invalid ACCOUNT__KMS__KEY_ID");
        }
        
        const PUBLIC_KEY = process.env.ACCOUNT__KMS__PUBLIC_KEY;
        if (typeof PUBLIC_KEY !== "string") {
            throw new Error("Invalid ACCOUNT__KMS__PUBLIC_KEY");
        }

        const kmsClient = new KMSClient();
        return new AwsKmsAccount(KEY_ID, PublicKey.fromHex(PUBLIC_KEY, "uncompressed"), kmsClient);
    }

    throw new Error("Unreachable line.");
}

export function getNonce(): bigint {
    const NONCE = process.env.NONCE;
    if (typeof NONCE !== "string") {
        throw new Error("Invalid NONCE");
    }

    return BigInt(NONCE);
}

export function getGenesisHash(): Uint8Array {
    const NETWORK = process.env.NETWORK;
    if (typeof NETWORK !== "string") {
        throw new Error("Invalid NETWORK");
    }

    if (NETWORK !== "ODIN" && NETWORK !== "HEIMDALL") {
        throw new Error("Invalid NETWORK value. It should be ODIN or HEIMDALL.");
    }

    return NETWORK === "ODIN" ? ODIN_GENESIS_HASH : HEIMDALL_GENESIS_HASH;
}

export function getHeadlessClient(): HeadlessClient {
    const HEADLESS_GQL = process.env.HEADLESS_GQL;
    if (typeof HEADLESS_GQL !== "string") {
        throw new Error("Invalid HEADLESS_GQL");
    }

    return HeadlessClient.create(HEADLESS_GQL);
}

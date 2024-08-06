import { Address } from "@planetarium/account";
import { TxMetadataProvider } from "./common";
import { GraphQLClient } from "graphql-request";
import { getSdk, Sdk } from "../generated/headless/graphql-request";
import { serializeSignedTx, SignedTx } from "../tx";

export class HeadlessClient implements TxMetadataProvider {
    private constructor(private readonly sdk: Sdk) {}

    public static create(url: string): HeadlessClient {
        const client = new GraphQLClient(url);
        return new HeadlessClient(getSdk(client));
    }

    async getNextNonce(address: Address): Promise<bigint> {
        const response = await this.sdk.GetNextNonce({
            address: address.toString(),
        });

        return BigInt(response.nextTxNonce);
    }

    async getGenesisHash(): Promise<Uint8Array> {
        const response = await this.sdk.GetGenesisHash();
        return Buffer.from(response.nodeStatus.genesis.hash, "hex");
    }

    async stageTransaction(signedTx: SignedTx): Promise<string> {
        const serialized = serializeSignedTx(signedTx);
        const response = await this.sdk.StageTransaction({
            tx: Buffer.from(serialized).toString("hex"),
        });

        return response.stageTransaction;
    }
}

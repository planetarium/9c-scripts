import { Address } from "@planetarium/account";

export interface TxMetadataProvider {
    getNextNonce(address: Address): Promise<bigint>;
    getGenesisHash(): Promise<Uint8Array>;
}

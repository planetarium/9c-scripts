import { Account, Address } from "@planetarium/account";
import { fav, MEAD, PolymorphicAction } from "@planetarium/lib9c";
import { UnsignedTx } from "@planetarium/tx";
import { TxMetadataProvider } from "./common";

type OverrideOpts = Omit<UnsignedTx, "signer" | "publicKey" | "genesisHash" | "actions">;

export async function makeTx(provider: TxMetadataProvider, actions: PolymorphicAction[], account: Account, opts?: OverrideOpts): Promise<UnsignedTx> {
    const address = await account.getAddress();
    const publicKey = await account.getPublicKey();
    const genesisHash = await provider.getGenesisHash();
    const nonce = await provider.getNextNonce(address);

    return {
        signer: address.toBytes(),
        publicKey: publicKey.toBytes("uncompressed"),
        genesisHash,
        nonce,
        updatedAddresses: new Set([]),
        maxGasPrice: fav(MEAD, 1n),
        gasLimit: 1n,
        actions: actions.map(a => a.bencode()),
        timestamp: new Date(),
        ...opts,
    };
}

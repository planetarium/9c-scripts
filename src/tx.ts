import { encode } from "@planetarium/bencodex";
import { encodeSignedTx, signTx } from "@planetarium/tx";

export type SignedTx = Awaited<ReturnType<typeof signTx>>;
export function serializeSignedTx(signedTx: SignedTx): Uint8Array {
    return encode(encodeSignedTx(signedTx));
}

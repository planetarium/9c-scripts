import { KMSClient, AwsKmsKeyStore } from "@planetarium/account-aws-kms";

const client = new KMSClient();
const keyStore = new AwsKmsKeyStore(client);
const response = await keyStore.get(process.argv[2]);
if (response.result === "success") {
    const account = response.account;
    const publicKey = await account.getPublicKey();
    const address = await account.getAddress();
    console.log(publicKey.toHex("uncompressed"));
} else if (response.result === "error") {
    console.error("Failed to get public key.", response.message);
} else {
    console.error("There is no such KMS key.");
}

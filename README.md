
Prerequisite: install dependencies
----------------------------------

```
yarn install --immutable
```


Prerequisite: setup environment variable about account
------------------------------------------------------

If you want to use `KMS` account, you must set `ACCOUNT_TYPE` to `KMS` and provide `ACCOUNT__KMS__KEY_ID`, `ACCOUNT__KMS__PUBLIC_KEY`. `ACCOUNT__KMS__PUBLIC_KEY` must be *uncompressed* format.

```plain
ACCOUNT_TYPE=KMS

ACCOUNT__KMS__KEY_ID=xxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxxx
ACCOUNT__KMS__PUBLIC_KEY=0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
```

If you want to use `RAW` account you must set `ACCOUNT_TYPE` to `RAW` and provide `ACCOUNT__RAW__PRIVATE_KEY`.

```plain
ACCOUNT_TYPE=RAW

ACCOUNT__RAW__PRIVATE_KEY=0000000000000000000000000000000000000000000000000000000000000000
```


Prerequisite: setup environment variable about headless
-------------------------------------------------------

You must set `HEADLESS_GQL` to the headless endpoint you use. (e.g., `https://9c-internal-rpc-1.nine-chronicles.com/graphql`, `https://heimdall-internal-rpc-1.nine-chronicles.com/graphql`)

```plain
HEADLESS_GQL=https://9c-internal-rpc-1.nine-chronicles.com/graphql
```


Prerequisite: generate code
---------------------------

This app uses generated GraphQL request code. You can generate them by running `yarn codegen`.

```sh
yarn codegen
```


Documentation: directory structure
----------------------------------

```plain
src/
  actions/     - Lib9c action implementations with @planetarium/lib9c
  cli/         - Executable scripts to build and stage transactions with action.
  providers/   - Codes related with `TxMetadataProvider` which provides `TxMetadata` (e.g., `genesisHash`, `nonce`).
```



Action: fetch KMS account's public key
--------------------------------------

If you know KMS key id and you want to know public key of your KMS account for `ACCOUNT__KMS__PUBLIC_KEY`, you can run the below command to get it:

```sh
yarn tsx src/cli/utils/kms/get_public_key.ts <KEY_ID>
```


Action: call 'approve_pledge'
-----------------------------

When your patron executed `request_pledge`, you should use `approve_pledge` action. After setting environment variables, you can run:

```sh
yarn tsx src/cli/approve_pledge.ts
```


Action: call 'make_guild'
-------------------------

If you want to make your own guild, you should use `make_guild` action. After setting environment variables, you can run:

```sh
yarn tsx src/cli/make_guild.ts
```

Action: call 'create_avatar'
----------------------------

If you want to make your new avatar, you should use `create_avatar` action. After setting environment variables, you can run:

```sh
yarn tsx src/cli/create_avatar.ts
```


Action: call 'migrate_pledge_to_guild'
--------------------------------------

If you want to migrate specific address actively (pledge -> guild), you should use `migrate_pledge_to_guild` action. After setting environment variables, you can run:

```sh
yarn tsx src/cli/migrate_pledge_to_guild.ts <AGENT_ADDRESS>
```

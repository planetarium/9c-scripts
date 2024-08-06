import type { Address } from "@planetarium/account";
import type { Value } from "@planetarium/bencodex";
import { PolymorphicAction } from "@planetarium/lib9c";

export type ApprovePledgeArgs = {
  patronAddress: Address;
};

export class ApprovePledge extends PolymorphicAction {
  protected readonly type_id: string = "approve_pledge";

  private readonly patronAddress: Address;

  constructor({ patronAddress }: ApprovePledgeArgs) {
    super();

    this.patronAddress = patronAddress;
  }

  protected plain_value(): Value {
    return this.patronAddress.toBytes();
  }
}

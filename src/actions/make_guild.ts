import type { Value } from "@planetarium/bencodex";
import { PolymorphicAction } from "@planetarium/lib9c";

export class MakeGuild extends PolymorphicAction {
  protected readonly type_id: string = "make_guild";

  protected plain_value(): Value {
    return null;
  }
}

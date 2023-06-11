import { randomUUID } from "crypto"

export abstract class Entity<Props> {
    protected constructor(protected props: Props, public readonly id: string = randomUUID()) {}
}

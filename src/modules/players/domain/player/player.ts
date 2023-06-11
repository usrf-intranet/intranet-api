import { Entity } from "../../../../core/domain/entity"
import { Optional } from "../../../../core/types/optional"
import { UnitRequirements } from "../../../characters/domain/unit/unit"
import { Token } from "./token"

export type TokenName =
    | "coreInfantry"
    | "medical"
    | "marksmanship"
    | "combatSupport"
    | "fieldLeadership"

export type Tokens = Record<TokenName, Token>

type PlayerProps = {
    discordId: string
    tokens: Tokens
    roles: string[]
}

export class Player extends Entity<PlayerProps> {
    get discordId() {
        return this.props.discordId
    }

    get tokens() {
        return this.props.tokens
    }

    get roles() {
        return this.props.roles
    }

    set roles(roles) {
        this.props.roles = roles
    }

    meetsRequirements(requirements: UnitRequirements) {
        return this.props.roles.some(roleId => requirements.roles.includes(roleId))
    }

    static create(props: Optional<PlayerProps, "tokens">, id?: string) {
        const defaultTokens = {
            coreInfantry: Token.create(0).value,
            medical: Token.create(0).value,
            marksmanship: Token.create(0).value,
            combatSupport: Token.create(0).value,
            fieldLeadership: Token.create(0).value,
        } as Tokens

        return new Player(
            {
                ...props,
                tokens: props.tokens ?? defaultTokens,
            },
            id
        )
    }
}

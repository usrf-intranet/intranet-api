import { describe, it, expect } from "vitest"
import { Player, Tokens } from "./player"
import { Token } from "./token"

describe("Player Entity", () => {
    it("should be able to create a new player", () => {
        const player = Player.create({
            discordId: "12345",
            roles: [],
        })

        expect(player).toBeInstanceOf(Player)
    })

    it("should be able to create a player with default tokens", () => {
        const player = Player.create({
            discordId: "12345",
            roles: [],
        })

        expect(player.tokens).toMatchObject({
            coreInfantry: { amount: 0 },
            medical: { amount: 0 },
            marksmanship: { amount: 0 },
            combatSupport: { amount: 0 },
            fieldLeadership: { amount: 0 },
        })
    })

    it("should be able to create a new player with specified tokens", () => {
        const player = Player.create({
            discordId: "12345",
            tokens: {
                coreInfantry: Token.create(5).value,
                medical: Token.create(0).value,
                marksmanship: Token.create(0).value,
                combatSupport: Token.create(0).value,
                fieldLeadership: Token.create(0).value,
            } as Tokens,
            roles: [],
        })

        expect(player.tokens).toMatchObject({
            coreInfantry: { amount: 5 },
            medical: { amount: 0 },
            marksmanship: { amount: 0 },
            combatSupport: { amount: 0 },
            fieldLeadership: { amount: 0 },
        })
    })

    it("should be able to check if a player meets unit requirements", () => {
        const player = Player.create({
            discordId: "12345",
            tokens: {
                coreInfantry: Token.create(5).value,
                medical: Token.create(0).value,
                marksmanship: Token.create(0).value,
                combatSupport: Token.create(0).value,
                fieldLeadership: Token.create(0).value,
            } as Tokens,
            roles: ["12345"],
        })

        expect(
            player.meetsRequirements({
                roles: ["12345"],
            })
        ).toBeTruthy()
    })
})

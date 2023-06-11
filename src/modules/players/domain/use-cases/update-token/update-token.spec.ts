import { describe, it, expect, beforeEach } from "vitest"
import { InMemoryPlayersRepository } from "../../../repositories/in-memory/in-memory-players-repository"
import { Player } from "../../player/player"
import { UpdateToken } from "./update-token"
import { Token } from "../../player/token"
import { InvalidTokenNameError } from "./errors/invalid-token-name-error"
import { PlayerNotFoundError } from "../../player/errors/player-not-found-error"
import { InvalidUpdateTokenOperationError } from "./errors/invalid-update-token-operation-error"
import { InvalidTokenAmountError } from "../../player/errors/invalid-token-amount-error"
import { InsufficientTokenAmountError } from "../../player/errors/insufficient-token-amount-error"

let playersRepository: InMemoryPlayersRepository
let updateToken: UpdateToken
let player: Player

describe("Update Token Use Case", () => {
    beforeEach(async () => {
        playersRepository = new InMemoryPlayersRepository()
        player = Player.create({ discordId: "987654321", roles: [] })
        await playersRepository.save(player)
        updateToken = new UpdateToken(playersRepository)
    })

    it("should be able to set to a player's token amount", async () => {
        const result = await updateToken.execute({
            playerDiscordId: player.discordId,
            token: "coreInfantry",
            operation: "set",
            amount: 5,
        })

        expect(result.isRight()).toBeTruthy()
        expect(player.tokens.coreInfantry.amount).toBe(5)
    })

    it("should be able to add to a player's token amount", async () => {
        player.tokens.coreInfantry = Token.create(5).value as Token
        const result = await updateToken.execute({
            playerDiscordId: player.discordId,
            token: "coreInfantry",
            operation: "add",
            amount: 5,
        })

        expect(result.isRight()).toBeTruthy()
        expect(player.tokens.coreInfantry.amount).toBe(10)
    })

    it("should be able to subtract from to a player's token amount", async () => {
        player.tokens.coreInfantry = Token.create(10).value as Token
        const result = await updateToken.execute({
            playerDiscordId: player.discordId,
            token: "coreInfantry",
            operation: "subtract",
            amount: 5,
        })

        expect(result.isRight()).toBeTruthy()
        expect(player.tokens.coreInfantry.amount).toBe(5)
    })

    it("should not be able to update the tokens of an inexistent player", async () => {
        const result = await updateToken.execute({
            playerDiscordId: "i do not exist",
            token: "coreInfantry",
            operation: "set",
            amount: 5,
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(PlayerNotFoundError)
    })

    it("should not accept an invalid token name", async () => {
        const result = await updateToken.execute({
            playerDiscordId: player.discordId,
            token: "i do not exist",
            operation: "set",
            amount: 5,
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(InvalidTokenNameError)
    })

    it("should not accept an invalid operation type", async () => {
        const result = await updateToken.execute({
            playerDiscordId: player.discordId,
            token: "coreInfantry",
            operation: "i do not exist",
            amount: 5,
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(InvalidUpdateTokenOperationError)
    })

    it("should not accept an invalid amounts", async () => {
        const result = await updateToken.execute({
            playerDiscordId: player.discordId,
            token: "coreInfantry",
            operation: "set",
            amount: -1.5,
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(InvalidTokenAmountError)
    })

    it("should not be able to subtract more tokens than a player has", async () => {
        const result = await updateToken.execute({
            playerDiscordId: player.discordId,
            token: "coreInfantry",
            operation: "subtract",
            amount: 5,
        })

        expect(result.isLeft()).toBeTruthy()
        expect(result.value).toBeInstanceOf(InsufficientTokenAmountError)
    })
})

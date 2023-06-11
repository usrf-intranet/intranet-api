import { describe, it, expect, beforeEach, test } from "vitest"
import { InMemoryPlayersRepository } from "../../../repositories/in-memory/in-memory-players-repository"
import { Register } from "./register"
import { Player } from "../../player/player"

let playersRepository: InMemoryPlayersRepository
let register: Register

const player = Player.create({ discordId: "987654321", roles: [] })

describe("Register Use Case", () => {
    beforeEach(async () => {
        playersRepository = new InMemoryPlayersRepository()
        await playersRepository.save(player)
        register = new Register(playersRepository)
    })

    it("should be able to register a new player", async () => {
        const result = await register.execute({ discordId: "12345" })

        expect(result.isRight()).toBeTruthy()
        expect(playersRepository.players).toContain(result.value)
    })

    test("a player should not be able to register again", async () => {
        const result = await register.execute({ discordId: player.discordId })

        expect(result.isLeft()).toBeTruthy()
    })
})

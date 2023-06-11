import { PlayersRepository } from "../players-repository"
import { Player } from "../../domain/player/player"

export class InMemoryPlayersRepository implements PlayersRepository {
    players = new Map<string, Player>()

    async save(player: Player) {
        this.players.set(player.id, player)
    }

    async findByDiscordId(discordId: string) {
        for (const player of this.players.values()) {
            if (player.discordId === discordId) {
                return player
            }
        }

        return null
    }
}

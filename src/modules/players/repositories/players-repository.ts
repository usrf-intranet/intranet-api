import { Player } from "../domain/player/player"

export interface PlayersRepository {
    save(player: Player): Promise<void>
    findByDiscordId(discordId: string): Promise<Player | null>
}

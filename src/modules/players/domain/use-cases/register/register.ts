import { Either, left, right } from "../../../../../core/logic/either"
import { PlayersRepository } from "../../../repositories/players-repository"
import { Player } from "../../player/player"
import { PlayerAlreadyRegisteredError } from "./errors/player-already-registered-error"

type RegisterRequest = {
    discordId: string
}

type RegisterResponse = Either<PlayerAlreadyRegisteredError, Player>

export class Register {
    constructor(private playersRepository: PlayersRepository) {}

    async execute({ discordId }: RegisterRequest): Promise<RegisterResponse> {
        const alreadyRegisteredPlayer = await this.playersRepository.findByDiscordId(discordId)

        if (alreadyRegisteredPlayer) {
            return left(new PlayerAlreadyRegisteredError())
        }

        const player = Player.create({
            discordId,
            roles: [],
        })
        await this.playersRepository.save(player)
        return right(player)
    }
}

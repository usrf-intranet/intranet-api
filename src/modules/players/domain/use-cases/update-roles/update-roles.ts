import { Either, left, right } from "../../../../../core/logic/either"
import { PlayersRepository } from "../../../repositories/players-repository"
import { PlayerNotFoundError } from "../../player/errors/player-not-found-error"

type UpdateRolesRequest = {
    playerDiscordId: string
    roles: string[]
}

type UpdateRolesResponse = Either<PlayerNotFoundError, null>

export class UpdateRoles {
    constructor(private playersRepository: PlayersRepository) {}

    async execute({ playerDiscordId, roles }: UpdateRolesRequest): Promise<UpdateRolesResponse> {
        const player = await this.playersRepository.findByDiscordId(playerDiscordId)

        if (!player) {
            return left(new PlayerNotFoundError())
        }

        player.roles = roles
        await this.playersRepository.save(player)
        return right(null)
    }
}

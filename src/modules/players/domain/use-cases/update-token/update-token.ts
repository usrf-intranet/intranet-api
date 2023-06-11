import { Either, left, right } from "../../../../../core/logic/either"
import { PlayersRepository } from "../../../repositories/players-repository"
import { InvalidTokenAmountError } from "../../player/errors/invalid-token-amount-error"
import { PlayerNotFoundError } from "../../player/errors/player-not-found-error"
import { InsufficientTokenAmountError } from "../../player/errors/insufficient-token-amount-error"
import { InvalidTokenNameError } from "./errors/invalid-token-name-error"
import { InvalidUpdateTokenOperationError } from "./errors/invalid-update-token-operation-error"
import { TokenName } from "../../player/player"
import { Token } from "../../player/token"

type UpdateTokenRequest = {
    playerDiscordId: string
    token: string
    operation: string
    amount: number
}

type UpdateTokenResponse = Either<
    | PlayerNotFoundError
    | InvalidUpdateTokenOperationError
    | InvalidTokenAmountError
    | InsufficientTokenAmountError,
    null
>

export class UpdateToken {
    constructor(private playersRepository: PlayersRepository) {}

    async execute({
        playerDiscordId,
        token,
        operation,
        amount,
    }: UpdateTokenRequest): Promise<UpdateTokenResponse> {
        const player = await this.playersRepository.findByDiscordId(playerDiscordId)

        if (!player) {
            return left(new PlayerNotFoundError())
        }

        if (!(token in player.tokens)) {
            return left(new InvalidTokenNameError())
        }

        const currentToken = player.tokens[token as TokenName]

        const newTokenByOperation = {
            add: currentToken.add(amount),
            subtract: currentToken.subtract(amount),
            set: Token.create(amount),
        }

        if (!(operation in newTokenByOperation)) {
            return left(new InvalidUpdateTokenOperationError())
        }

        const newTokenOrError = newTokenByOperation[operation as keyof typeof newTokenByOperation]

        if (newTokenOrError.isLeft()) {
            return left(newTokenOrError.value)
        }

        const newToken = newTokenOrError.value
        player.tokens[token as TokenName] = newToken
        await this.playersRepository.save(player)
        return right(null)
    }
}

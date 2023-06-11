import { Either, left, right } from "../../../../core/logic/either"
import { InvalidRankNameLengthError } from "./errors/invalid-rank-name-length-error"

export const MAX_RANK_NAME_LENGTH = 100

export class RankName {
    private constructor(public readonly value: string) {}

    private static validate(name: string) {
        return !!name && name.length <= MAX_RANK_NAME_LENGTH
    }

    static create(name: string): Either<InvalidRankNameLengthError, RankName> {
        if (this.validate(name)) {
            return right(new RankName(name))
        }

        return left(new InvalidRankNameLengthError())
    }
}

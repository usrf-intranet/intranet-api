import { Either, left, right } from "../../../../core/logic/either"
import { InsufficientTokenAmountError } from "./errors/insufficient-token-amount-error"
import { InvalidTokenAmountError } from "./errors/invalid-token-amount-error"

export class Token {
    private constructor(public readonly amount: number) {}

    add(amount: number): Either<InvalidTokenAmountError, Token> {
        return Token.create(this.amount + amount)
    }

    subtract(
        amount: number
    ): Either<InsufficientTokenAmountError | InvalidTokenAmountError, Token> {
        if (amount > this.amount) {
            return left(new InsufficientTokenAmountError())
        }

        return Token.create(this.amount - amount)
    }

    private static validate(amount: number) {
        return Number.isInteger(amount) && amount >= 0
    }

    static create(amount: number): Either<InvalidTokenAmountError, Token> {
        if (this.validate(amount)) {
            return right(new Token(amount))
        }

        return left(new InvalidTokenAmountError())
    }
}

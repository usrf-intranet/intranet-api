import { describe, it, expect } from "vitest"
import { Token } from "./token"
import { InsufficientTokenAmountError } from "./errors/insufficient-token-amount-error"

describe("Token Value Object", () => {
    it("should accept valid amounts", () => {
        const tokenOrError = Token.create(0)

        expect(tokenOrError.isRight()).toBeTruthy()
    })

    it("should reject invalid amounts", () => {
        const tokenOrError = Token.create(-1.5)

        expect(tokenOrError.isLeft()).toBeTruthy()
    })

    it("should be able to add an amount", () => {
        const token = Token.create(0).value as Token
        const addedTokenOrError = token.add(5)

        expect(addedTokenOrError.isRight()).toBeTruthy()

        const addedToken = addedTokenOrError.value as Token

        expect(addedToken.amount).toBe(5)
    })

    it("should be able to subtract an amount", () => {
        const token = Token.create(10).value as Token
        const subtractedTokenOrError = token.subtract(5)

        expect(subtractedTokenOrError.isRight()).toBeTruthy()

        const subtractedToken = subtractedTokenOrError.value as Token
        expect(subtractedToken.amount).toBe(5)
    })

    it("should not be able to subtract an amount greater than the current amount", () => {
        const token = Token.create(10).value as Token
        const subtractedTokenOrError = token.subtract(11)

        expect(subtractedTokenOrError.isLeft()).toBeTruthy()
        expect(subtractedTokenOrError.value).toBeInstanceOf(InsufficientTokenAmountError)
    })
})

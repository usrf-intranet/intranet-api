import { describe, it, expect } from "vitest"
import { MAX_UNIT_NAME_LENGTH, UnitName } from "./unit-name"

describe("Unit Name Value Object", () => {
    it("should accept valid names", () => {
        const unitNameOrError = UnitName.create("1st Expeditionary Rifle Battalion")

        expect(unitNameOrError.isRight()).toBeTruthy()
    })

    it("should reject empty names", () => {
        const unitNameOrError = UnitName.create("")

        expect(unitNameOrError.isLeft()).toBeTruthy()
    })

    it("should reject names longer than the maximum length", () => {
        const unitNameOrError = UnitName.create("*".repeat(MAX_UNIT_NAME_LENGTH + 1))

        expect(unitNameOrError.isLeft()).toBeTruthy()
    })
})

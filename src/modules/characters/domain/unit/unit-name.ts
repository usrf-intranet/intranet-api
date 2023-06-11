import { Either, left, right } from "../../../../core/logic/either"
import { InvalidUnitNameLengthError } from "./errors/invalid-unit-name-length-error"

export const MAX_UNIT_NAME_LENGTH = 100

export class UnitName {
    private constructor(public readonly value: string) {}

    private static validate(name: string) {
        return !!name && name.length <= MAX_UNIT_NAME_LENGTH
    }

    static create(name: string): Either<InvalidUnitNameLengthError, UnitName> {
        if (this.validate(name)) {
            return right(new UnitName(name))
        }

        return left(new InvalidUnitNameLengthError())
    }
}

import { Either, left, right } from "../../../../core/logic/either"
import { InvalidSalaryAmountError as InvalidSalaryAmountError } from "./errors/invalid-salary-amount-error"

export class Salary {
    private constructor(public readonly amount: number) {}

    static create(amount: number): Either<InvalidSalaryAmountError, Salary> {
        if (amount > 0) {
            return right(new Salary(amount))
        }

        return left(new InvalidSalaryAmountError())
    }
}

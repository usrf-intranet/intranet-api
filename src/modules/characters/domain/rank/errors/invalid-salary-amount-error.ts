export class InvalidSalaryAmountError extends Error {
    constructor() {
        super("Invalid salary amount.")
        this.name = "InvalidSalaryAmountError"
    }
}

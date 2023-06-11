export class InvalidUnitNameLengthError extends Error {
    constructor() {
        super("Invalid unit name length.")
        this.name = "InvalidUnitNameLengthError"
    }
}

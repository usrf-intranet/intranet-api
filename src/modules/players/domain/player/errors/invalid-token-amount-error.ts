export class InvalidTokenAmountError extends Error {
    constructor() {
        super("Invalid token amount.")
        this.name = "InvalidTokenAmountError"
    }
}

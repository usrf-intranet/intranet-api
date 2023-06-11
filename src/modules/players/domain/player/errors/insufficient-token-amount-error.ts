export class InsufficientTokenAmountError extends Error {
    constructor() {
        super("Player does not have enough tokens to do this operation.")
        this.name = "InsufficientTokenAmountError"
    }
}

export class InvalidTokenNameError extends Error {
    constructor() {
        super("Invalid token name.")
        this.name = "InvalidTokenNameError"
    }
}

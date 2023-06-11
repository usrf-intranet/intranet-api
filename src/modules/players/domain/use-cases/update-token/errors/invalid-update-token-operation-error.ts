export class InvalidUpdateTokenOperationError extends Error {
    constructor() {
        super("Invalid update token operation.")
        this.name = "InvalidUpdateTokenOperationError"
    }
}

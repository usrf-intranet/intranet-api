export class InvalidRankNameLengthError extends Error {
    constructor() {
        super("Invalid rank name length.")
        this.name = "InvalidRankNameLengthError"
    }
}

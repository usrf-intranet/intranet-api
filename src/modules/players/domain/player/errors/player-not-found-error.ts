export class PlayerNotFoundError extends Error {
    constructor() {
        super("Player not found.")
        this.name = "PlayerNotFoundError"
    }
}

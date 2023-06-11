export class PlayerAlreadyRegisteredError extends Error {
    constructor() {
        super("Player already registered.")
        this.name = "PlayerAlreadyRegisteredError"
    }
}

export class UnitAlreadyExistsError extends Error {
    constructor() {
        super("This name is already in use by another unit.")
        this.name = "UnitAlreadyExistsError"
    }
}

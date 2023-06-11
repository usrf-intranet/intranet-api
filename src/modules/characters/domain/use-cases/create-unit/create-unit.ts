import { Either, left, right } from "../../../../../core/logic/either"
import { UnitsRepository } from "../../../repositories/units-repository"
import { InvalidUnitNameLengthError } from "../../unit/errors/invalid-unit-name-length-error"
import { Unit } from "../../unit/unit"
import { UnitName } from "../../unit/unit-name"
import { UnitAlreadyExistsError } from "./errors/unit-already-exists-error"

type CreateUnitRequest = {
    name: string
}

type CreateUnitResponse = Either<InvalidUnitNameLengthError | UnitAlreadyExistsError, Unit>

export class CreateUnit {
    constructor(private unitsRepository: UnitsRepository) {}

    async execute({ name }: CreateUnitRequest): Promise<CreateUnitResponse> {
        const unitNameOrError = UnitName.create(name)

        if (unitNameOrError.isLeft()) {
            return left(unitNameOrError.value)
        }

        const unitName = unitNameOrError.value
        const unit = Unit.create({
            name: unitName,
            requirements: {
                roles: [],
            },
        })

        const alreadyExistingUnit = await this.unitsRepository.findByName(unit.name.value)

        if (alreadyExistingUnit) {
            return left(new UnitAlreadyExistsError())
        }

        await this.unitsRepository.save(unit)
        return right(unit)
    }
}
